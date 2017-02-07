import { Action } from '@ngrx/store';
import { Category } from '../../pojos/category';
import { Task } from '../../pojos/task';
import { type } from '../../utils/typecache';

export const ActionTypes = {
  LOAD_ALL:                   type('[Category] Load All'),
  LOAD_ALL_COMPLETE:          type('[Category] Load All Completed'),
  LOAD_CATEGORY:              type('[Category] Load Category'),
  LOAD_CATEGORY_COMPLETE:     type('[Category] Load Category Completed'),
  CREATE_CATEGORY:            type('[Category] Create Category'),
  CREATE_CATEGORY_COMPLETE:   type('[Category] Create Category Completed'),
  DELETE_CATEGORY:            type('[Category] Delete Category'),
  DELETE_CATEGORY_COMPLETE:   type('[Category] Delete Category Completed'),
  DESELECT_CATEGORY:          type('[Category] Deselect Category'),
  CREATE_TASK:                type('[Task] Create Task'),
  CREATE_TASK_COMPLETE:       type('[Task] Create Task Completed'),
  UPDATE_TASK:                type('[Task] Update Task'),
  UPDATE_TASK_COMPLETE:       type('[Task] Update Task Completed'),
  DELETE_TASK:                type('[Task] Delete Task'),
  DELETE_TASK_COMPLETE:       type('[Task] Delete Task Completed')  
};

export class LoadAllAction implements Action {
  type = ActionTypes.LOAD_ALL;
  constructor() { }
}

export class LoadAllCompleteAction implements Action {
  type = ActionTypes.LOAD_ALL_COMPLETE;
  constructor(public payload: Category) { }
}

export class LoadCategoryAction implements Action {
  type = ActionTypes.LOAD_CATEGORY;
  constructor(public payload: number) { }
}

export class LoadCategoryCompleteAction implements Action {
  type = ActionTypes.LOAD_CATEGORY_COMPLETE;
  constructor(public payload: Category) { }
}

export class CreateTaskAction implements Action {
  type = ActionTypes.CREATE_TASK;
  constructor(public payload: Task) {}
}

export class CreateTaskCompleteAction implements Action {
  type = ActionTypes.CREATE_TASK_COMPLETE;
  constructor(public payload: Task) {}
}

export class UpdateTaskAction implements Action {
  type = ActionTypes.UPDATE_TASK;
  constructor(public payload: Task) {}
}

export class UpdateTaskCompleteAction implements Action {
  type = ActionTypes.UPDATE_TASK_COMPLETE;
  constructor(public payload: Task) {}
}

export class CreateCategoryAction implements Action {
  type = ActionTypes.CREATE_CATEGORY;
  constructor(public payload: Category) {}
}

export class CreateCategoryCompleteAction implements Action {
  type = ActionTypes.CREATE_CATEGORY_COMPLETE;
  constructor(public payload: Category) {}
}

export class DeleteCategoryAction implements Action {
  type = ActionTypes.DELETE_CATEGORY;
  constructor(public payload: Category) {}
}

export class DeleteCategoryCompleteAction implements Action {
  type = ActionTypes.DELETE_CATEGORY_COMPLETE;
  constructor(public payload: Category) {}
}

export class DeleteTaskAction implements Action {
  type = ActionTypes.DELETE_TASK;
  constructor(public payload: Task) {}
}

export class DeleteTaskCompleteAction implements Action {
  type = ActionTypes.DELETE_TASK_COMPLETE;
  constructor(public payload: Task) {}
}

export class DeselectCategoryAction implements Action {
  type = ActionTypes.DESELECT_CATEGORY;
  constructor() {}
}

export type Actions
  = LoadAllAction
  | LoadAllCompleteAction
  | LoadCategoryAction 
  | LoadCategoryCompleteAction
  | CreateTaskAction
  | CreateTaskCompleteAction;