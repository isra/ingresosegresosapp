import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";
import { Subscription } from "rxjs";

import { IngresoEgresoModel } from "../ingresoegreso.model";
import { IngresoEngresoService } from "../ingreso-engreso.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  itemsSubscription: Subscription = new Subscription();
  items: IngresoEgresoModel[] = [];

  constructor(
    private store: Store<AppState>,
    private ingresoEngresoService: IngresoEngresoService
  ) {
    this.itemsSubscription = this.store
      .select("items")
      .subscribe(ingresosEgresos => (this.items = ingresosEgresos.items));
  }

  ngOnInit() {}

  deleteItem(item: IngresoEgresoModel) {
    this.ingresoEngresoService.deleteItem(item.uid).then(
      response => {
        Swal.fire("Eliminado", item.description, "success");
      },
      err => {
        Swal.fire("Error al eliminar", item.description, "error");
      }
    );
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
