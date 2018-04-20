import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';



@Injectable()
export class FolderService {

  domain=environment.domain;   //test domain
  options;

  constructor(
    private authService: AuthService,
    private http: Http
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


   //Function to get all teacher's folders
   getTeacherFolder(){
  
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/Tfolders/'+ this.getUsername(), this.options).map(res=>res.json());   
  }


  //Function to get all folder's files
  getFolderFiles(folderID){
      this.createAuthenticationHeaders();   //create the header for the request
      return this.http.get(this.domain + 'folders/files/'+ folderID +'/'+this.getUsername(), this.options).map(res=>res.json());   
    }

  //Function to get username from localStorage
  getUsername(){
    var user=localStorage.getItem('user');
    var userObj= JSON.parse(user)   //convert to object
    return userObj.username;
  }







}
