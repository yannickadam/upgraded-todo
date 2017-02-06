import { UUID } from 'angular2-uuid';
import {Task} from "./task";

export class Category {

  public processing: boolean = false;
  public uuid:string = UUID.UUID();

  constructor(public id:number, public name:string, public parentId:number, public subs:Category[], public tasks:Task[] ) {}

  public duplicate() {
    const newCategory = new Category(this.id, this.name, this.parentId, [...this.subs], [...this.tasks]);
    newCategory.uuid = this.uuid;
    newCategory.processing = this.processing;
    return newCategory;
  }

  public static revive( data:any, uuid?:string ):Category {
    let tasks = [];
    if( data.tasks ) {
      tasks = data.tasks.map( t => Task.revive(t) );
    }    
    const category = new Category(data.id, data.name, data.parentId, data.subs, tasks);
    if( uuid ) category.uuid = uuid;
    return category;
  }

}