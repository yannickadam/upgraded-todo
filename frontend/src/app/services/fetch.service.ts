/**
 * Configuration for the application
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../pojos/user';
import {UrlConfig} from '../config/url.config';


@Injectable()
export class FetchService {

  private user:User;

  constructor(private router:Router, private store:Store<any>) {
    this.store.select("user").subscribe( (user:User) => this.user = user );
  }

  async fetch(...data) {

    // Prepend server URL
    data[0] = `${UrlConfig.SERVER_URL}${data[0]}`;

    // Ensure we have an object for options and headers;
    if( !data[1] ) data[1] = {};
    if( !data[1].headers ) data[1].headers = {};

    // Add standard Accept and Content-Type
    data[1].headers["Accept"] = "application/json";
    data[1].headers["Content-Type"] = "application/json";

    // Add token if possible
    if( this.user && this.user.token ) data[1].headers.token = this.user.token;

    let response:Response = await fetch.apply(null, data);
    
    // 403? Redirect!
    if( response.status === 401 || response.status === 403 ) {
      this.router.navigateByUrl('/login');
    }

    return response;
  }

};