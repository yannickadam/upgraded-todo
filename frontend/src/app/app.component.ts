import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private userService:UserService, private router:Router) { }

  public Login() {
    this.router.navigateByUrl("/login");
  }

}
