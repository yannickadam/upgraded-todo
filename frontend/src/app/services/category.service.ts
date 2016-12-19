/**
 * 
 */
import {Injectable} from '@angular/core';
import {ConfigurationService} from './config.service';
import {UserService} from './user.service';
import {FetchService} from './fetch.service';

@Injectable()
export class CategoryService {

  public categories;

  constructor(private config:ConfigurationService, private userService:UserService, private fetchService:FetchService) {}

  /*
   *
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

    return category;
  }

}