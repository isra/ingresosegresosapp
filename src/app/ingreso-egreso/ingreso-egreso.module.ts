import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
// Modules App
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";

// Components
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
// Pipes
import { OrderIngresoEgresoPipe } from "../pipes/order-ingreso-egreso.pipe";

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrderIngresoEgresoPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule, SharedModule]
})
export class IngresoEgresoModule {}
