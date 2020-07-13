import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/todo.service';
import { element } from 'protractor';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [TodoService]
})
export class TodolistComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoservice:TodoService) { }

  ngOnInit() {
    this.toDoservice.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element =>{
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    });
  }


  onAdd(itemTitle){    
      this.toDoservice.addTitle(itemTitle.value);
      itemTitle.value = null;
  }

  alterCheck($key:string,isChecked){
    this.toDoservice.checkOrUncheckTitle($key,!isChecked);
  }

  onDelete($key:string){
    this.toDoservice.removeTitle($key);
  }

}
