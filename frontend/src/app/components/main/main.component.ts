import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MainAnimation} from '../../animations/router.animations';

import { Store } from '@ngrx/store';
import { Category } from '../../pojos/category';
import { ActionTypes } from "../../stores/categories/categories.actions";
import { CategoriesState } from "../../stores/categories/categories.reducers";

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'main-component',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html',
  animations: [MainAnimation()],
  host: {'[@routerTransition]': ''},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  public categories:Observable<Category[]>;
  public model:any = {};

  constructor(private router:Router, private store:Store<any>, private ref:ChangeDetectorRef) {}

  /**
   * Retrieve the current state of categories when the component is created.
   */
  async ngOnInit() {

    this.categories = this.store.select(s=>s.categories)
                                .map(state => state.all)
                                .filter( (c:Category) => !c.parentId );
    /*
    this.store.select("categories").subscribe( (state:CategoriesState)=> {
      this.categories = state.root;
      this.ref.markForCheck();
    });*/
    this.store.dispatch( {type: ActionTypes.LOAD_ALL} );
  }

  /**
   * 
   */
  private cancelEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * 
   */
  public selectCategory(id) {
    this.router.navigate(['/category/', id]);
  }

  /**
   * Deletes a category
   * TODO: Since this could be very destructive, we need to have some kind of warning :)
   */
  public async deleteCategory(id) {
    try {
      //await this.categoryService.deleteCategory(id);
    } catch(e) {
      console.log(e);
    }
  }

}
