import { Action } from '@ngrx/store';
import { User } from '../../pojos/user';
import { type } from '../../utils/typecache';

export const ActionTypes = {
  LOGIN:           type('[User] Login'),
  LOGIN_COMPLETE:  type('[User] Login Completed'),
  LOGOUT:          type('[User] Logout')
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  constructor(public payload: string) { }
}

export class LoginCompleteAction implements Action {
  type = ActionTypes.LOGIN_COMPLETE;
  constructor(public payload: User) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor(public payload: string) { }
}

export type Actions
  = LoginAction
  | LoginCompleteAction
  | LogoutAction;