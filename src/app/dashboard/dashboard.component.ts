import { Component, OnInit } from "@angular/core";

import { IngresoEngresoService } from "../ingreso-egreso/ingreso-engreso.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(private ingresoEngresoService: IngresoEngresoService) {}

  ngOnInit() {
    this.ingresoEngresoService.initIngresoEgresoListener();
  }
}
