/**
 * 
 */
import {Injectable} from '@angular/core';
import {ConfigurationService} from './config.service';
import {UserService} from './user.service';
import {FetchService} from './fetch.service';

@Injectable()
export class CategoryService {

  public categories:any[];

  constructor(private config:ConfigurationService, private userService:UserService, private fetchService:FetchService) {}

  /**
   * Retrieves all categories from the backend, and store them locally
   */
  public async getCategories() {    
   let response = await this.fetchService.fetch(`${this.config.SERVER_URL}/categories`, {     
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.userService.token
      }
    });
    
    if( response.status !== 200 ) {
      throw( await response.text());
    }

    this.categories = await response.json();

    return this.categories;
  }

  /**
   * Adds a single category, and upon success stores it locally.
   * TODO: Sub-Categories
   */
  public async createCategory(name:string) {

    let response = await this.fetchService.fetch(`${this.config.SERVER_URL}/categories`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.userService.token
      },
      body: JSON.stringify({name:name})
    });
    
    if( response.status !== 201 ) {
      throw( await response.text() );
    }

    let category = await response.json();
    this.categories.push(category);

    return category;
  }

  /**
   * 
   */
  public async deleteCategory(id:string) {

    let response = await this.fetchService.fetch(`${this.config.SERVER_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.userService.token
      }
    });

    if( response.status !== 204 ) {
      throw( await response.text() );
    }

    // Remove Category locally
    let idx = this.categories.findIndex( e => e.id === id );
    this.categories.splice(idx,1);
  }


}