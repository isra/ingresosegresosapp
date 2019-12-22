import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

// Redux
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as fromUI from "../actions/ui.actions";
import * as fromIngresoEgreso from "../actions/ingresosegresos.actions";

import { AuthService } from "./auth.service";
import { IngresoEgresoModel } from "../model/ingresoegreso.model";

import { Observable, Subscription } from "rxjs";

import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class IngresoEngresoService {
  private authUserSubscription: Subscription = new Subscription();
  private itemsSnapcollectionSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private afStore: AngularFirestore,
    private authService: AuthService
  ) {}

  add(ingresoegreso: IngresoEgresoModel) {
    const user = this.authService.getUser();
    return this.afStore
      .doc(`${user.uid}/ingreso-egreso`)
      .collection("items")
      .add({ ...ingresoegreso });
  }

  initIngresoEgresoListener() {
    this.authUserSubscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        const path = `${auth.user.uid}/ingreso-egreso/items`;
        this._ingresoEgresoItems(path);
      });
  }

  private _ingresoEgresoItems(path: string) {
    this.itemsSnapcollectionSubscription = this.afStore
      .collection(path)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(item => {
            return {
              uid: item.payload.doc.id,
              ...(item.payload.doc.data() as IngresoEgresoModel)
            } as IngresoEgresoModel;
          });
        })
      )
      .subscribe((data: IngresoEgresoModel[]) => {
        const ingresoEgresoCollection = new fromIngresoEgreso.SetIngresosEgresosAction(
          data
        );
        this.store.dispatch(ingresoEgresoCollection);
      });
  }

  cancelSubscriptions() {
    this.store.dispatch(new fromIngresoEgreso.UnsetIngresosEgresosAction());
    this.itemsSnapcollectionSubscription.unsubscribe();
    this.authUserSubscription.unsubscribe();
  }

  deleteItem(uid: string): Promise<any> {
    const pathDocument = `${
      this.authService.getUser().uid
    }/ingreso-egreso/items/${uid}`;
    return this.afStore.doc(pathDocument).delete();
  }
}
