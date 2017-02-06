import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {User} from '../../pojos/user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public user: User;

  constructor(private router:Router, private store: Store<any>, private ref: ChangeDetectorRef) {

    this.store.select("user").subscribe( (user:User) => {
      this.user = user;
      this.ref.markForCheck();
      });
  }

  /**
   * 
   */
  public Login() {
    this.router.navigateByUrl("/login");
  }  

}
