import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import {User} from '../pojos/user';
import {Category} from '../pojos/category';

import * as fromUser from './user/user.reducers';
import * as fromCategory from './categories/categories.reducers';


export interface State {
  user: User;
  categories: Category[];
}

const reducers = {
  user: fromUser.userReducer,
  categories: fromCategory.categoryReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if ('production' === ENV) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}