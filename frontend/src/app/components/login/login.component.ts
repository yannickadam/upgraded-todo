import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FadeAnimation} from '../../animations/router.animations';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  animations: [FadeAnimation()],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent {

  public model:any = {};

  constructor(private userService:UserService, private router:Router) {

  }

  /**
   * 
   */
  public loginWithSocial(network:string) {
    const obs = this.userService.loginWithSocial(network);
    obs.subscribe({
      error: (err) => {console.log(err)},
      complete: () => {
        this.router.navigateByUrl("/main");
      }
    });
  }

  /**
   * Logs-out the user and return to the home page.
   */
  public logout() {
    this.userService.logout();
    this.router.navigateByUrl("/home");
  }

  /**
   * 
   */
  public async onSubmit() { 
    let response = await this.userService.login(this.model.email, this.model.password);

    if( response.status != 200 ) {
      alert(":(((");
    } else {
      this.router.navigateByUrl("/main");
    }
  }

}
