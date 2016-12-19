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

  constructor(private userService:UserService, private categoryService:CategoryService, private router:Router) {}

  async ngOnInit() {
    try {
      this.categories = await this.categoryService.getCategories();
    } catch(e) {
      console.log(e);
    }
  }

}
