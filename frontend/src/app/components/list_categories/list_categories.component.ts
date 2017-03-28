import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OtherAnimation} from '../../animations/router.animations';

import { Store } from '@ngrx/store';
import { Task } from '../../pojos/task';
import { Category } from '../../pojos/category';
import {
  CreateCategoryAction,
  CreateTaskAction,
  DeleteCategoryAction,
  DeleteTaskAction,
  LoadCategoryAction,
  UpdateTaskAction
} from '../../stores/categories/categories.actions';
import { CategoriesState } from "../../stores/categories/categories.reducers";

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'list-categories',
  styleUrls: ['./list_categories.component.css'],
  templateUrl: './list_categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoriesComponent {

  @Input() categories;

  private routeSub:any;
  private storeSub:any;
  private id:number;
  public category:Observable<Category>;

  private model:any = {};

  constructor(private route:ActivatedRoute, private store:Store<any>) {}

  public async ngOnInit() {     
    //this.routeSub = this.route.params.subscribe(this.categoryHandler.bind(this));
  }

  public async categoryHandler(params) {
    this.id = +params['id'];
    this.store.dispatch( new LoadCategoryAction(this.id) );
    this.category = this.store.select(s=>s.categories).map( (state:CategoriesState) => state.all.find(c=>c.id === this.id) );
  }

  /**
   * Creates a new category
   */
  public async createCategory() {
    const newCategory = new Category(undefined, this.model.category, this.id, [], []);
    this.store.dispatch(new CreateCategoryAction(newCategory));
    this.model.category = "";
  }

  /**
   * Deletes a category
   * TODO: Since this could be very destructive, we need to have some kind of warning :)
   */
  public async deleteCategory(id:number) {
    const deletedCategory = new Category(id, undefined, this.id, [], []);
    this.store.dispatch(new DeleteCategoryAction(deletedCategory));
  }

  public cancelEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Removes subscription when destroyed
   */
  public async ngOnDestroy() {
    if( this.routeSub ) this.routeSub.unsubscribe();
  }

}

