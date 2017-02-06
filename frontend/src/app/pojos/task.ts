import { UUID } from 'angular2-uuid';

export class Task {

  public processing: boolean = false;
  public uuid:string = UUID.UUID();

  constructor( public id:number, public name:string, public categoryId:number, public completed:boolean) {
  }


  public duplicate() {
    const newTask = new Task(this.id, this.name, this.categoryId, this.completed);
    newTask.uuid = this.uuid;
    newTask.processing = this.processing;
    return newTask;
  }

  public static revive( data:any, uuid?:string ) {
    const task = new Task( data.id, data.name, data.categoryId, data.completed );
    if( uuid ) task.uuid = uuid;
    return task;
  }

}