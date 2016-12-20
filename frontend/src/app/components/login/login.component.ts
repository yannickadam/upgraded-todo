import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public model:any = {};

  constructor(private userService:UserService, private router:Router) {

  }

  public async onSubmit() { 
    let response = await this.userService.login(this.model.email, this.model.password);

    if( response.status != 200 ) {
      alert(":(((");
    } else {
      this.router.navigateByUrl("/main");
    }
  }

}
