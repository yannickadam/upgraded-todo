import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {CategoryService} from '../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'foudou',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html'
})
export class MainComponent {

  public categories:any[] = [];
  public model:any = {};

  constructor(private userService:UserService, private categoryService:CategoryService, private router:Router) {}

  /**
   * Retrieve the current state of categories when the component is created.
   */
  async ngOnInit() {
    try {
      this.categories = await this.categoryService.getCategories();
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Creates a new category
   * TODO: Associate to sub-categories
   */
  public async createCategory() {
    try {
      let cat = await this.categoryService.createCategory(this.model.category);
      this.model = {};
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * Deletes a category
   * TODO: Since this could be very destructive, we need to have some kind of warning :)
   */
  public async deleteCategory(id) {
    try {
      await this.categoryService.deleteCategory(id);
    } catch(e) {
      console.log(e);
    }
  }

}
