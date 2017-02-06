import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { User } from '../../pojos/user';

@Injectable()
export class HomeGuard implements CanActivate {

  private user:User;

  constructor(private router: Router, private store:Store<any>) {
    this.store.select(s=>s.user).subscribe(user=>this.user=user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if( this.user ) {
      this.router.navigate(['/main']);
      return false;
    }

    return true;
  }
}