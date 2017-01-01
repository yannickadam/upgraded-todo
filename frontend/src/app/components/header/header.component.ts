import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private userService:UserService, private router:Router) { }

  /**
   * 
   */
  public Login() {
    this.router.navigateByUrl("/login");
  }

}
