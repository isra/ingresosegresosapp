import * as fromIngresosEgresos from "./ingresosegresos.actions";
import { IngresoEgresoModel } from "../model/ingresoegreso.model";
import { InitialState } from "@ngrx/store/src/models";

export interface IIngresosegresosState {
  items: IngresoEgresoModel[];
}

const initialState: IIngresosegresosState = {
  items: []
};

export function IngresosEgresosReducer(
  state = initialState,
  action: fromIngresosEgresos.actions
): IIngresosegresosState {
  switch (action.type) {
    case fromIngresosEgresos.SET_INGRESOS_EGRESOS:
      return {
        items: action.ingreosegresos.map(item => {
          return {
            ...item
          };
        })
      };
    case fromIngresosEgresos.UNSET_INGRESOS_EGRESOS:
      return {
        items: []
      };
    default:
      return state;
  }
}
