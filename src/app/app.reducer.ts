import { ActionReducerMap } from "@ngrx/store";
import * as fromUIReducer from "./reducers/ui.reduder";
import * as fromAuth from "./reducers/auth.reducer";
import * as fromIngresosEgresos from "./reducers/ingresosegresos.reducer";

export interface AppState {
  ui: fromUIReducer.IState;
  auth: fromAuth.AuthState;
  items: fromIngresosEgresos.IIngresosegresosState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.UIReducer,
  auth: fromAuth.authReducer,
  items: fromIngresosEgresos.IngresosEgresosReducer
};
