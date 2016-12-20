import {Component} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'category',
  styleUrls: ['./category.component.css'],
  templateUrl: './category.component.html'
})
export class CategoryComponent {

  private sub:any;
  private id:number;
  private category:any;

  private model:any = {};

  constructor(private categoryService:CategoryService, private route:ActivatedRoute) {

  }

  public async ngOnInit() {     
    this.sub = this.route.params.subscribe(this.categoryHandler.bind(this));   
  }

  public async categoryHandler(params) {
    this.id = +params['id'];
    console.log("Should get Category... ",this.id);
    
    this.category = await this.categoryService.getCategory(this.id);
  }

  public async createTask() {
    try {
      let task = await this.categoryService.createTask(this.category.id, this.model.task);
      this.category.tasks = this.category.tasks || [];
      this.category.tasks.push(task); 
    } catch(e) {
      console.log(e);
    }
  }

  public async ngOnDestroy() {
    if( this.sub) this.sub.unsubscribe();
  }

}
