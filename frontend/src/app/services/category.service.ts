/**
 * 
 */
import {Injectable} from '@angular/core';
import {UrlConfig} from '../config/url.config';
import {UserService} from './user.service';
import {FetchService} from './fetch.service';

import { Store } from '@ngrx/store';
import { User } from '../pojos/user';

@Injectable()
export class CategoryService {

  public rootCategories:any[];
  public allCategories:any[] = [];
  public user:User = null;

  constructor(private fetchService:FetchService, private store:Store<any>) {
    
    this.store.select("user").subscribe( (user:User) => {
      // On any change, reset our data
      this.reset();
      this.user = user;
    }); 
  }

  /**
   * removes everything from memory
   */
  public reset() {
    this.rootCategories = undefined;
    this.allCategories = [];
  }

  /**
   * Retrieves all categories from the backend, and store them locally
   */
  public async getCategories() {

    if( !this.rootCategories ) {

      let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/categories`, {     
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.user.token
        }
      });
      
      if( response.status !== 200 ) {
        throw( await response.text());
      }

      this.rootCategories = await response.json();

    }
    
    return this.rootCategories;
  }

  /**
   * Retrieves a single category
   */
  public async getCategory(id:number) {

    // Check if we have this category in cache
    let category = this.allCategories.find(e=>e.id === id);
    if( !category ) {
    
      let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/categories/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.user.token
        }
      });
    
      if( response.status !== 200 ) {
        throw( await response.text());
      }

      // Replace category in list
      category = await response.json();
      this.allCategories.push(category);
    }

    return category;
  }  


  /**
   * Adds a single category, and upon success stores it locally.
   * TODO: Sub-Categories
   */
  public async createCategory(name:string, parentId?:number) {

    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/categories`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.user.token
      },
      body: JSON.stringify({name:name, parentId:parentId})
    });
    
    if( response.status !== 201 ) {
      throw( await response.text() );
    }

    // Save new category locally
    let category = await response.json();    
    this.allCategories.push(category);

    // If we have a parent, we should also add it to this parent.
    if( category.parentId ) {
      let parent = this.allCategories.find(e=>e.id === category.parentId);
      if( parent ) {
        if( !parent.subs ) {
          parent.subs = [];
        }
        parent.subs.push(category);
      }
    } else {
      // If we don't have a parentId, this goes in the root categories
      this.rootCategories.push(category);
    }

    return category;
  }

  /**
   * 
   */
  public async deleteCategory(id:number, parentId?:number) {

    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.user.token
      }
    });

    if( response.status !== 204 ) {
      throw( await response.text() );
    }

    // Remove Category locally
    let idx = this.allCategories.findIndex( e => e.id === id );
    if( idx != -1 ) {
      this.allCategories.splice(idx,1);
    }

    // If we have a parent, remove from parent as well
    if( parentId ) {
      let parent = this.allCategories.find( e => e.id === parentId );
      if( parent ) {
        let idx = parent.subs.findIndex( e=> e.id === id );
        if( idx != -1 ) {
          parent.subs.splice(idx,1);
        }
      }
      
    }    

  }

  /**
   * Creates a task in the given category
   */
  public async createTask(categoryId:number, taskName:string) {

    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/categories/${categoryId}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.user.token
      },
      body: JSON.stringify({name:taskName})
    });
    
    if( response.status !== 201 ) {
      throw( await response.text() );
    }

    let task = await response.json();

    return task;
  }

  /**
   * Deletes a single task
   */
  public async deleteTask(categoryId:number, taskId:number) {
    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.user.token
      }
    });

    if( response.status !== 204 ) {
      throw( await response.text() );
    }

    // Remove task locally
    let category = this.allCategories.find( e => e.id === categoryId);
    let idx = category.tasks.findIndex( e => e.id === taskId );
    category.tasks.splice(idx,1);
  }

  /**
   * 
   */
  public async updateTask(task:any):Promise<any> {
    
    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.user.token
      },
      body: JSON.stringify(task)
    });

    if( response.status !== 200 ) {
      throw( await response.text() );
    }

    let updatedTask = await response.json();

    return updatedTask;
  }


}