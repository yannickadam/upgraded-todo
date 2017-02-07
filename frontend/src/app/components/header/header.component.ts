import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {User} from '../../pojos/user';
import {Category} from '../../pojos/category';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public user$: Observable<User>;
  public selectedCategory: Category;
  public selectedCategory$: Observable<Category>;
  public sub:any;

  constructor(private router:Router, private store: Store<any>, private ref: ChangeDetectorRef) {
    this.user$ = this.store.select("user");    
    this.selectedCategory$ = this.store.select(s=>s.categories).map(s=>s.selected);    
  }

  public ngOnInit() {
    this.sub = this.selectedCategory$.subscribe(c => this.selectedCategory = c);
  }

  /**
   * 
   */
  public Login() {
    this.router.navigateByUrl("/login");
  }  

  public Back() {
    if( this.selectedCategory && this.selectedCategory.parentId) {
      this.router.navigateByUrl(`/category/${this.selectedCategory.parentId}`);
    } else {
      this.router.navigateByUrl("/main");
    }
    
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
