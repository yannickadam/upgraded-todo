import {Component} from '@angular/core';
import {OtherAnimation} from '../../animations/router.animations';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

import { Store } from '@ngrx/store';
import { Category } from '../../pojos/category';
import { CreateCategoryAction } from "../../stores/categories/categories.actions";
import { CategoriesState } from "../../stores/categories/categories.reducers";


@Component({
  selector: 'edit-category',
  styleUrls: ['./edit.category.component.css'],
  templateUrl: './edit.category.component.html',
  animations: [OtherAnimation()],
  host: {'[@routerTransition]': ''}
})
export class EditCategoryComponent {

  public model:any = {};

  constructor(private router:Router, private store:Store<any>) {}

  /**
   * Creates a new category
   */
  public async createCategory() {
    const newCategory = new Category(undefined, this.model.category, undefined, [], []);
    this.store.dispatch(new CreateCategoryAction(newCategory));
    this.router.navigate(["/main"]);
  }

}

