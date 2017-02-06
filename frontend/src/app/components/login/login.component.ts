import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FadeAnimation} from '../../animations/router.animations';
import { Store } from '@ngrx/store';
import { ActionTypes } from '../../stores/user/user.actions';
import { User } from '../../pojos/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  animations: [FadeAnimation()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent {

  public model:any = {};
  public user: User;
  private subs: any;

  constructor(private router:Router, private store: Store<any>) {
  }

  public ngOnInit() {
    this.subs = this.store.select("user").subscribe( (user:User) => { 
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  /**
   * 
   */
  public loginWithSocial(network:string) {
    this.store.select("user").skip(1).take(1).subscribe( (user)=> {
      if( user ) {
        this.router.navigateByUrl("/main");  
      }
    });
    this.store.dispatch({type: ActionTypes.LOGIN, payload: "google" });
    
  }

  /**
   * Logs-out the user and return to the home page.
   */
  public logout() {
    this.store.dispatch({type: ActionTypes.LOGOUT});
    this.router.navigateByUrl("/home");
  }

  /**
   * 
   */
  public async onSubmit() { 
    /*
    let response = await this.userService.login(this.model.email, this.model.password);

    if( response.status != 200 ) {
      alert(":(((");
    } else {
      this.router.navigateByUrl("/main");
    }*/
  }

}
