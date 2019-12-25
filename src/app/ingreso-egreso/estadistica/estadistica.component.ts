import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
// import { AppState } from "../../app.reducer";
import * as fromIngresosEgresos from "../ingresosegresos.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: []
})
export class EstadisticaComponent implements OnInit {
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  totalItemsIngresos: number = 0;
  totalItemsEgresos: number = 0;

  doughnutChartData = [];
  doughnutChartLabels = ["Ingresos", "Egresos"];
  chartColors: any[] = [
    {
      backgroundColor: ["#28a745", "#c80000", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }
  ];

  constructor(private store: Store<fromIngresosEgresos.AppState>) {
    this.store.select("ingresosegresos").subscribe(ingresosEgresos => {
      this.totalIngresos = 0;
      this.totalEgresos = 0;

      this.totalItemsIngresos = 0;
      this.totalItemsEgresos = 0;
      ingresosEgresos.items.forEach(item => {
        if (item.type === "ingreso") {
          this.totalIngresos += item.amount;
          this.totalItemsIngresos++;
        } else {
          this.totalEgresos += item.amount;
          this.totalItemsEgresos++;
        }
        this.doughnutChartData = [
          this.totalIngresos.toString(),
          this.totalEgresos.toString()
        ];
      });
    });
  }

  ngOnInit() {}
}
