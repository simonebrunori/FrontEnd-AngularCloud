import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos=[];
  todoText="";


  constructor(private authService:AuthService) { }


  //Function to check todo
  check(todo){
    $('#'+todo).addClass('closed');
    this.authService.closeTodo(todo).subscribe(data=>{  //Set todo as closed
      console.log(data.message);
    })
  }


  //Function to uncheck todo
  unCheck(todo){
    $('#'+todo).removeClass('closed');
    this.authService.openTodo(todo).subscribe(data=>{  //Set todo as open
      console.log(data.message);
    })
  }

  //Function to delete todo
  delete(id){
    this.authService.deleteTodos(id).subscribe(data=>{
      console.log(data.message);
      this.getTodos();
    })
  }
  


  //Function to get todos from db
  getTodos(){
    this.authService.getTodos().subscribe(data=>{
      this.todos=data.todos.todos;
    })
    
  }

  //Function to add new todo
  addNew(){
    var todo={text:this.todoText};
    this.authService.postTodos(todo).subscribe(data=>{
      console.log(data.message);
      this.todoText="";
      this.getTodos();
    })
  }


  ngOnInit() {


    this.getTodos();    //Get user's todos on component load

  }

}
