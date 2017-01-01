import {Component} from '@angular/core';
import {OtherAnimation} from '../../animations/router.animations';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'edit-category',
  styleUrls: ['./edit.category.component.css'],
  templateUrl: './edit.category.component.html',
  animations: [OtherAnimation()],
  host: {'[@routerTransition]': ''}
})
export class EditCategoryComponent {

  public model:any = {};

  constructor(private categoryService:CategoryService, private router:Router) {}

  /**
   * Creates a new category
   */
  public async createCategory() {    
    try {
      let cat = await this.categoryService.createCategory(this.model.category);
      this.model = {};
      this.router.navigate(["/main"]);
    } catch(e) {
      console.log(e);
    }
  }

}

