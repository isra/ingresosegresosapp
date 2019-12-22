import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

// Redux
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as fromUI from "../actions/ui.actions";

import { IngresoEgresoModel } from "../model/ingresoegreso.model";
import { IngresoEngresoService } from "../services/ingreso-engreso.service";

import Swal from "sweetalert2";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  frmData: FormGroup;
  typeInput = "ingreso";
  savingEvent = false;

  loadingSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEngresoService
  ) {}

  ngOnInit() {
    this.frmData = new FormGroup({
      description: new FormControl("", Validators.required),
      amount: new FormControl(0, Validators.min(1))
    });

    this.loadingSubscription = this.store.select("ui").subscribe(state => {
      this.savingEvent = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  saveOperation() {
    const ingresoEgreso = new IngresoEgresoModel({
      ...this.frmData.value,
      type: this.typeInput
    });
    this.store.dispatch(new fromUI.ActivateLoadingAction());
    this.ingresoEgresoService
      .add(ingresoEgreso)
      .then(response => {
        // console.log(response);
        this.frmData.reset({
          amount: 0
        });
        this.store.dispatch(new fromUI.DesactivateLoadingAction());
        Swal.fire("Guardado", "Operación realizada con éxito", "success");
      })
      .catch(err => {
        Swal.fire("Erro al guardar Ingreso/Egreso", err.message, "error");
      });
  }
}
