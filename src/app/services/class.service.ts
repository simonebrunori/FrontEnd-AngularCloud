import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
 
@Injectable()
export class ClassService {

  domain=environment.domain;   //test domain
  options;

  constructor(
    private http:Http,
    private authService:AuthService
  ) { }


  //Function to create headers, add token, to be used in http requests
  createAuthenticationHeaders(){
    this.authService.loadToken(); //Load token to attach to headers
    //Headers configuration options
    this.options=new RequestOptions({
      headers: new Headers({
        'Content-Type':'application/json',  //format set to json
        'authorization': this.authService.authToken   //attach token
      })
    })
  }


  //Function to get all teacher's classes
  getTeacherClasses(){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'users/myClasses', this.options).map(res=>res.json());   
  }




}
