import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {environment} from '../../environments/environment';


@Injectable()
export class AuthService {

  domain=environment.domain;   //test domain
  authToken;
  user;
  options;

  constructor(private http: Http) { }

  //Function to create headers, add token, to be used in http requests
  createAuthenticationHeaders(){
    this.loadToken(); //Load token to attach to headers
    //Headers configuration options
    this.options=new RequestOptions({
      headers: new Headers({
        'Content-Type':'application/json',  //format set to json
        'authorization': this.authToken   //attach token
      })
    })
  }

  // Function to get token from client local storage
  loadToken(){
    this.authToken=localStorage.getItem('token'); //load token to browser local storage
  }

  //Function to login user
  login(user){
    return this.http.post(this.domain + 'users/login', user).map(res=> res.json());
  }

  //Function to logout
  logout(){
    this.authToken=null;  //set token to null
    this.user=null;   //set user to null
    localStorage.clear();   //clear local storage
    sessionStorage.clear();
  }

  //Function to store user's data to client local storage
  storeUserData(token,user){
    console.log(user);
    localStorage.setItem('token', token);   //Set token in local storage
    localStorage.setItem('username',user.username); //Set username in local storage as string
    localStorage.setItem('type',user.type); //Set type in local storage as string
    this.authToken=token;   //Set token to be used anywhere
    this.user=user;   //Set user to be used anywhere
  }

  //Function to get user's profile data
  getProfile(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/profile', this.options).map(res=>res.json());
  }

  //Function to get all users data
  getAllUsers(username){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/allUsers/'+username, this.options).map(res=>res.json());
  }


  //Function to check if user is logged in
  loggedIn(){
    return tokenNotExpired();
  }

  //Function to get students number
  getTotalStudents(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/studentsCount', this.options).map(res=>res.json());
  }

  //Function to get teachers number
  getTotalTeachers(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/teachersCount', this.options).map(res=>res.json());
  }


  //Function to get todos 
  getTodos(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/getTodos', this.options).map(res=>res.json());
  }

  //Function to post todos 
  postTodos(todo){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.put(this.domain+'users/addTodo', todo, this.options).map(res=>res.json());
  }

  //Function to post todos 
  deleteTodos(id){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/deleteTodo/'+id, this.options).map(res=>res.json());
  }


  //Function to set todos as closed 
  closeTodo(id){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/todoClosed/'+id, this.options).map(res=>res.json());
  }
  
  //Function to set todos as open 
  openTodo(id){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/todoOpen/'+id, this.options).map(res=>res.json());
  }


  //Function to hide/view todo widget from dashboard
  viewHideTodo(status){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/todoStatus/'+status , this.options).map(res=>res.json());
  }

  //Function to hide/view text editor widget from dashboard
  viewHideTE(status){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/teStatus/'+status , this.options).map(res=>res.json());
  }

  //Function to get all users
  getAllUsersWhithMe(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/getAllUsers', this.options).map(res=>res.json());
  }

  // Function to check if username is taken
  checkUsername(username) {
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain + 'users/checkUsername/' + username, this.options).map(res => res.json());
  }


  // Function to register new user
  registerUser(user) {
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.post(this.domain + 'users/register' ,user, this.options).map(res => res.json());
  }


    // Function to get selected user's data
    getUserData(userId) {
      this.createAuthenticationHeaders(); //create token before sending to API
      return this.http.get(this.domain + 'users/profileData/' + userId, this.options).map(res => res.json());
    }

    // Function to update student's profile with class
    addClassToStudent(studentId, clas) {
      this.createAuthenticationHeaders(); //create token before sending to API
      return this.http.put(this.domain + 'users/addClassToStudent/' + studentId, clas,this.options).map(res => res.json());
    }

    // Function to update student's profile with class
    addClassToTeacher(teacherId, classes) {
      this.createAuthenticationHeaders(); //create token before sending to API
      return this.http.put(this.domain + 'users/addClassToTeacher/' + teacherId, classes,this.options).map(res => res.json());
    }


    // Function to delete user
    deleteUser(userId) {
      this.createAuthenticationHeaders(); //create token before sending to API
      return this.http.delete(this.domain + 'users/deleteUser/' + userId ,this.options).map(res => res.json());
    }


  

}
