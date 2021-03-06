import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
/* import { DashboardComponent } from "./dashboard/dashboard.component";

import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuard } from "./auth/auth.guard"; */
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  /* {
    path: "",
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard]
  }, */
  {
    path: "",
    loadChildren: "./ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule",
    canLoad: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
