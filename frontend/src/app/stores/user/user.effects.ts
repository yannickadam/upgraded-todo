import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as user from './user.actions';
import {AuthService} from 'ng2-ui-auth';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private auth:AuthService) { }


  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType( user.ActionTypes.LOGIN )
    .map((action: user.LoginAction) => action.payload)
    .mergeMap( (authProvider:string) => {

      const obs = this.auth.authenticate(authProvider);
      return obs.map( r => r.json() ).map( data => {
            return new user.LoginCompleteAction( data.data );
          } 
        )
        .catch( () => of(new user.LoginCompleteAction(null) ) );
    });          
}