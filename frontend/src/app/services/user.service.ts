/**
 * 
 */
import {Injectable} from '@angular/core';
import {UrlConfig} from '../config/url.config';
import {FetchService} from './fetch.service';
import {AuthService} from 'ng2-ui-auth';
import {Subject}    from 'rxjs/Subject';


@Injectable()
export class UserService {

  private userLoginSource = new Subject<boolean>();

  public userLogin$ = this.userLoginSource.asObservable();
  public token:string;
  

  constructor(private fetchService:FetchService, private auth:AuthService) {
    this.revive();
  }

  /**
   * If we have a token, we're logged-in.
   */
  public isLoggedIn():boolean {
    return !!this.token;
  }


  /**
   * To logout, we simply forget our token.
   */
  public logout() {
    this.token = undefined;
    localStorage.removeItem("token");
  }


  /**
   * 
   */
  public loginWithSocial(network:string) {
    const obs = this.auth.authenticate(network).share();
    obs.subscribe({
      complete: () => {
        this.token = this.auth.getToken();
        this.persist();
        this.userLoginSource.next(true);
      }
    })
    return obs;
  }

  /**
   * 
   */
  public async login(email:string, password:string) {
    let response = await this.fetchService.fetch(`${UrlConfig.SERVER_URL}/users/login`, {
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