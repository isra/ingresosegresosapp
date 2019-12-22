import { Pipe, PipeTransform } from "@angular/core";
import { IngresoEgresoModel } from "../model/ingresoegreso.model";

@Pipe({
  name: "orderIngresoEgreso"
})
export class OrderIngresoEgresoPipe implements PipeTransform {
  transform(value: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return value.sort((a, b) => {
      if (a.type === "ingreso") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
