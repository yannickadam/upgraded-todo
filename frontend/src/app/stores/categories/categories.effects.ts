import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as category from './categories.actions';

import {FetchService} from '../../services/fetch.service';
import {Task} from '../../pojos/task';
import {Category} from '../../pojos/category';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private fetchService:FetchService) { }


  // Load all Categories
  @Effect()
  loadAll$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.LOAD_ALL)
    .switchMap( () => {
      let response = Observable.fromPromise(this.fetchService.fetch(`/categories`, {method: 'GET'}));
      return response.mergeMap( r => r.json() )
                     .map( (data:any) => { return new category.LoadAllCompleteAction( data ); })
                     .catch( () => of(new category.LoadAllCompleteAction(null) ) );
    });

  // Load a Category
  @Effect()
  loadCategory$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.LOAD_CATEGORY)
    .map((action: category.LoadCategoryAction) => action.payload)
    .switchMap( (categoryId) => {
      let response = Observable.fromPromise(this.fetchService.fetch(`/categories/${categoryId}`, {method: 'GET'}));
      return response.mergeMap( r => r.json() )
                     .map( (data:any) => { return new category.LoadCategoryCompleteAction( data ); })
                     .catch( () => of(new category.LoadCategoryCompleteAction(null) ) );
    });

  // Create a Category
  @Effect()
  createCategory$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.CREATE_CATEGORY)
    .map((action: category.CreateCategoryAction) => action.payload)
    .mergeMap( newCategory => {
      console.log("CREATE CATEGORIES Effects ", newCategory);
      let response = Observable.fromPromise(this.fetchService.fetch(`/categories/`, {method: 'POST', body: JSON.stringify(newCategory)}));
      return response.mergeMap( r => r.json() )
                     .map( (data:any) => { return new category.CreateCategoryCompleteAction( Category.revive(data, newCategory.uuid) ); })
                     .catch( () => of(new category.CreateCategoryCompleteAction(null) ) );
    });

  // Delete a Category
  @Effect()
  deleteCategory$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.DELETE_CATEGORY)
    .map((action: category.DeleteCategoryAction) => action.payload)
    .mergeMap( deletedCategory => {
      console.log("DELETE CATEGORIES Effects ", deletedCategory);
      let response = Observable.fromPromise(this.fetchService.fetch(`/categories/${deletedCategory.id}`, {method: 'DELETE'}));
      return response.map( (data:any) => { return new category.DeleteCategoryCompleteAction( deletedCategory ); })
                     .catch( () => of(new category.DeleteCategoryCompleteAction(null) ) );
    });


  // Create a new task
  @Effect()
  createTask$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.CREATE_TASK)
    .map((action: category.CreateTaskAction) => action.payload)
    .mergeMap( newTask => {
      console.log("CREATE TASKS Effects ", newTask);
      let response = Observable.fromPromise(this.fetchService.fetch(`/categories/${newTask.categoryId}/tasks`, {method: 'POST', body: JSON.stringify({name:newTask.name})}));
      return response.mergeMap( r => r.json() )
                     .map( (data:any) => { return new category.CreateTaskCompleteAction( Task.revive(data, newTask.uuid) ); })
                     .catch( () => of(new category.CreateTaskCompleteAction(null) ) );
    });

  // Update a  task
  @Effect()
  updateTask$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.UPDATE_TASK)
    .map((action: category.UpdateTaskAction) => action.payload)
    .mergeMap( updatedTask => {
      console.log("UPDATE TASK Effects ", updatedTask);
      let response = Observable.fromPromise(this.fetchService.fetch(`/tasks/${updatedTask.id}`, {method: 'PATCH', body: JSON.stringify(updatedTask)}));
      return response.mergeMap( r => r.json() )
                     .map( (data:any) => { return new category.UpdateTaskCompleteAction( Task.revive(data, updatedTask.uuid) ); })
                     .catch( () => of(new category.UpdateTaskCompleteAction(null) ) );
    });

  // Delete a task
  @Effect()
  deleteTask$: Observable<Action> = this.actions$
    .ofType( category.ActionTypes.DELETE_TASK)
    .map((action: category.DeleteTaskAction) => action.payload)
    .mergeMap( deletedTask => {
      console.log("DELETE TASK Effects ", deletedTask);
      let response = Observable.fromPromise(this.fetchService.fetch(`/tasks/${deletedTask.id}`, {method: 'DELETE'}));
      return response.map( (data:any) => { return new category.DeleteTaskCompleteAction( deletedTask ); })
                     .catch( () => of(new category.DeleteTaskCompleteAction(null) ) );
    });


}