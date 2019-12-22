import * as fromUI from "../actions/ui.actions";

export interface IState {
  isLoading: boolean;
}

const currentState: IState = {
  isLoading: false
};

export function UIReducer(
  state = currentState,
  action: fromUI.actions
): IState {
  switch (action.type) {
    case fromUI.UI_ACTIVATE:
      return {
        isLoading: true
      };
    case fromUI.UI_DESACTIVATE:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
