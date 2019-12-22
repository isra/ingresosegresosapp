import { Action } from "@ngrx/store";
import { IngresoEgresoModel } from "../model/ingresoegreso.model";

export const SET_INGRESOS_EGRESOS = "[IngresosEgresos] Set ingresos egresos";
export const UNSET_INGRESOS_EGRESOS =
  "[IngresosEgresos] Unset ingresos egresos";

export class SetIngresosEgresosAction implements Action {
  readonly type = SET_INGRESOS_EGRESOS;

  constructor(public ingreosegresos: IngresoEgresoModel[]) {}
}

export class UnsetIngresosEgresosAction implements Action {
  readonly type = UNSET_INGRESOS_EGRESOS;
}

export type actions = SetIngresosEgresosAction | UnsetIngresosEgresosAction;
