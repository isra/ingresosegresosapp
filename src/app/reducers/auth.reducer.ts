import * as fromAuth from "../actions/auth.actions";
import { User } from "../model/user.model";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export function authReducer(
  state = initialState,
  action: fromAuth.actions
): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: {
          ...action.user
        }
      };
    case fromAuth.UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}
