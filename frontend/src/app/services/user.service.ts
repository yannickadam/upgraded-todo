/**
 * 
 */
import {Injectable} from '@angular/core';
import {ConfigurationService} from './config.service';
import {FetchService} from './fetch.service';

@Injectable()
export class UserService {

  public token:string;

  constructor(private config:ConfigurationService, private fetchService:FetchService) {
    this.revive();
  }

  public async login(email:string, password:string) {
    let response = await this.fetchService.fetch(`${this.config.SERVER_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:email, password:password})
    });

    if( response.status === 200 ) {
      let body:any = await response.json();
      this.token = body.data.token;
      this.persist();
    }

    return response;
  }

  private persist() {
    localStorage.setItem("token", this.token);
  }

  private revive() {
    let data = localStorage.getItem("token");
    this.token = data;
  }


}