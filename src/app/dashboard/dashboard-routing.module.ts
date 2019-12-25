import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
