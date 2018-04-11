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
    this.loadToken(); //Loado token to attach to headers
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
  }

  //Function to store user's data to client local storage
  storeUserData(token,user){
    localStorage.setItem('token', token);   //Set token in local storage
    localStorage.setItem('user',JSON.stringify(user)); //Set username in local storage as string
    this.authToken=token;   //Set token to be used anywhere
    this.user=user;   //Set user to be used anywhere
  }

  //Function to get user's profile data
  getProfile(){
    this.createAuthenticationHeaders(); //create token before sending to API
    return this.http.get(this.domain+'users/profile', this.options).map(res=>res.json());
  }


  //Function to check if user is logged in
  loggedIn(){
    return tokenNotExpired();
  }

  

}
