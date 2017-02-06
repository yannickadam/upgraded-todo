// 
import { ActionReducer, Action } from '@ngrx/store';
import { Category } from '../../pojos/category';
import { Task } from '../../pojos/task';
import * as category from './categories.actions';

export interface CategoriesState {
  all: Category[];  
}

const initial:CategoriesState = { all:[] };

export function categoryReducer(state: CategoriesState = initial, action: Action):CategoriesState {
    switch (action.type) {

        case category.ActionTypes.CREATE_TASK:
        case category.ActionTypes.UPDATE_TASK:
        case category.ActionTypes.DELETE_TASK:
        {
            console.log("CREATE/UPDATE/DELETE TASK REDUCER", action, state);
            const task = <Task>(action.payload).duplicate();
            task.processing = true;
            return {
                all: state.all.map( c => {
                    if( c.id == task.categoryId ) {
                        const updatedCat = c.duplicate();
                        const idx = updatedCat.tasks.findIndex( t=>t.id == task.id );                        
                        if(task.id && idx > -1) {                            
                            updatedCat.tasks[idx] = task;
                        } else {
                            updatedCat.tasks.push(task);
                        }
                        return updatedCat;
                    }
                    return c;    
                })
            }
        }

        case category.ActionTypes.CREATE_CATEGORY:
        case category.ActionTypes.DELETE_CATEGORY:
        {
            console.log("CREATE/UPDATE/DELETE CATEGORY REDUCER", action, state);
            const newCategory = <Category>(action.payload).duplicate();
            newCategory.processing = true;
            const updatedAll = [...state.all];
            const idxCat = updatedAll.findIndex(c=>c.id == newCategory.id);
            if( idxCat ) {
                updatedAll[idxCat] = newCategory;
            } else {
                updatedAll.push(newCategory);
            }
            return {
                all: updatedAll
            }
        }

        case category.ActionTypes.CREATE_CATEGORY_COMPLETE:
        {
            console.log("CATEGORY CREATION/UPDATE COMPLETE REDUCER", action, state);
            const newCat:Category = action.payload;
            const updated = [...state.all];
            const index = updated.findIndex( c => c.uuid == newCat.uuid );

            // TODO: Check if this should be done elsewhere? Or maybe change data model...
            if( newCat.parentId ) {
                const idx = updated.findIndex( c => c.id == newCat.parentId );
                if( idx > -1 ) {
                    const dupCat = updated[idx].duplicate();
                    dupCat.subs = [...dupCat.subs, newCat];
                    updated[idx] = dupCat;
                }
            }

            if( index ) {
                updated[index] = newCat;
            } else {                
                updated.push(newCat);
            }
            return {
                all: updated
            }
        }

        case category.ActionTypes.DELETE_CATEGORY_COMPLETE:
        {
            console.log("DELETE CATEGORY REDUCER", action, state);
            const deletedCategory:Category = action.payload;
            const upAll = [...state.all];

            // Remove from global list
            const idxDel = upAll.findIndex(c=>c.id == deletedCategory.id);            
            if( idxDel > -1 ) {
                upAll.splice(idxDel,1);
            }
            debugger;
            // Remove from parent if loaded
            const idxParent = upAll.findIndex(c=>c.id == deletedCategory.parentId);
            if( idxParent > -1 ) {
                const newCategory = upAll[idxParent].duplicate();
                const idx = newCategory.subs.findIndex(s=>s.id == deletedCategory.id);
                if( idx ) {
                    newCategory.subs.splice(idx, 1);
                }
                upAll[idxParent] = newCategory;
            }

            return {
                all: upAll
            }            
        }

        case category.ActionTypes.LOAD_ALL_COMPLETE:
        {
            console.log("ALL CATEGORIES LOAD REDUCER", action, state);

            const rootCategories:Category[] = action.payload.map( c => Category.revive(c) );
            const newAll = state.all.map( c => rootCategories.find( rc => rc.id == c.id ) || c );
            rootCategories.forEach( rc => newAll.find( c => c.id==rc.id )?null:newAll.push(rc));
            return {
              all: newAll
            };
        }

        case category.ActionTypes.LOAD_CATEGORY_COMPLETE:
        {
            console.log("CATEGORY LOAD REDUCER", action, state);

            // Revive this
            const receivedCategory = Category.revive(action.payload);            
            const otherAll = [...state.all];
            const idx = otherAll.findIndex(c=>c.id == receivedCategory.id);
            if( idx > -1 ) {
                otherAll[idx] = receivedCategory;
            } else {
                otherAll.push(receivedCategory);
            }
            return {
                all: otherAll
            };
        }

        case category.ActionTypes.UPDATE_TASK_COMPLETE:
        case category.ActionTypes.CREATE_TASK_COMPLETE:
        {
            console.log("TASK CREATION/UPDATE COMPLETE REDUCER", action, state);
            const task = <Task>(action.payload).duplicate();
            task.processing = false;
            const updatedCategories = [...state.all];            
            const idx = updatedCategories.findIndex( c=>c.id == task.categoryId );            
            if( idx > -1 ) {
                const newCategory = updatedCategories[idx].duplicate();
                updatedCategories[idx] = newCategory;
                const taskIdx = newCategory.tasks.findIndex( t => t.uuid == task.uuid );
                if( taskIdx > -1 ) {
                    newCategory.tasks[taskIdx] = task;
                } else {
                    newCategory.tasks.push(task);
                }                
            }
            return {
                all: updatedCategories
            }
        }

        case category.ActionTypes.DELETE_TASK_COMPLETE:
        {
            console.log("DELETE TASK REDUCER", action, state);
            const deletedTask:Task = action.payload;
            const upAll = [...state.all];

            // find category
            const idxCat = upAll.findIndex(c=>c.id == deletedTask.categoryId);
            if( idxCat > -1 ) {
                const newCategory = upAll[idxCat].duplicate();
                upAll[idxCat] = newCategory;
                const idxTask = newCategory.tasks.findIndex(t=>t.id == deletedTask.id);
                if( idxTask > -1 ) {                    
                    newCategory.tasks.splice(idxTask,1);                    
                }
            }

            return {
                all: upAll
            }              
        }

        default:
            return state;
    }
}