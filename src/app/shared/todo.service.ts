import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList : AngularFireList<any>;

  constructor(private firedb:AngularFireDatabase) { }

  getToDoList(){
    this.toDoList = this.firedb.list('titles');
    return this.toDoList;
  }

  addTitle(title : string){
    this.toDoList.push({
      title: title,
      isChecked: false,
    });
  }

  checkOrUncheckTitle($key: string, flag: boolean){
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTitle($key: string){
    this.toDoList.remove($key);

  }

  // editTitle($key: string){
  //   this.toDoList.update($key);
  // }
}
