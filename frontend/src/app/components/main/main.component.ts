import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import {MainAnimation} from '../../animations/router.animations';

@Component({
  selector: 'foudou',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html',
  animations: [MainAnimation()],
  host: {'[@routerTransition]': ''}
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
      await this.categoryService.deleteCategory(id);
    } catch(e) {
      console.log(e);
    }
  }

}
