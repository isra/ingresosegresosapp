import { Action } from "@ngrx/store";

import { User } from "../model/user.model";

export const SET_USER = "[User] Set user";

export class SetUserAction implements Action {
  readonly type = SET_USER;
  constructor(public user: User) {}
}

export type actions = SetUserAction;
