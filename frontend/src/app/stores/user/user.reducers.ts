// 
import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../../pojos/user';
import * as user from './user.actions';

const initial:User = User.restore();

export function userReducer(state: User = initial, action: Action) {
    switch (action.type) {
        case user.ActionTypes.LOGIN_COMPLETE:
            console.log("LOGIN REDUCER", action, state);
            const revived = User.revive(action.payload);
            revived.persist();
            return revived;

        case user.ActionTypes.LOGOUT:
            console.log("LOGOUT REDUCER", action);
            User.clear();
            return null;

        default:
            return state;
    }
}