import { ActionReducerMap } from "@ngrx/store";
import * as fromUIReducer from "./shared/ui.reduder";
import * as fromAuth from "./auth/auth.reducer";

export interface AppState {
  ui: fromUIReducer.IState;
  auth: fromAuth.AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: fromUIReducer.UIReducer,
  auth: fromAuth.authReducer
};
