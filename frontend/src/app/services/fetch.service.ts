/**
 * Configuration for the application
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class FetchService {

  constructor(private router:Router) {}

  async fetch(...data) {
    let response:Response = await fetch.apply(null, data);
    
    // 403? Redirect!
    if( response.status === 401 || response.status === 403 ) {
      this.router.navigateByUrl('/login');
    }

    return response;
  }

};