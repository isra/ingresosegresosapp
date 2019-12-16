import { Action } from "@ngrx/store";

export const UI_ACTIVATE: string = "[UI State is Activate]";
export const UI_DESACTIVATE: string = "[UI State is Desactivate]";

export class ActivateLoadingAction implements Action {
  readonly type = UI_ACTIVATE;
}

export class DesactivateLoadingAction implements Action {
  readonly type = UI_DESACTIVATE;
}

export type actions = ActivateLoadingAction | DesactivateLoadingAction;
