import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Observable} from 'rxjs';



@Injectable()
export class FolderService {

  domain=environment.domain;   //test domain
  options;

  constructor(
    private authService: AuthService,
    private http: Http,
    private _http:HttpClient
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
      return this.http.get(this.domain + 'folders/files/'+ folderID /*+'/'+this.getUsername()*/, this.options).map(res=>res.json());   
    }

  //Function to get file's informations
  getFileInfo(fileName){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/fileInfo/'+ fileName , this.options).map(res=>res.json());   
  }


  //Function to get users list
  getUsersList(fileName){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/fileUser/'+ fileName , this.options).map(res=>res.json());   
  }

  //Function to get username from localStorage
  getUsername(){
    var user=localStorage.getItem('user');
    var userObj= JSON.parse(user)   //convert to object
    return userObj.username;
  }


  //Function to get all children folders of a folder
  getChildrenFolders(parent){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/childrenFolders/'+ parent , this.options).map(res=>res.json()); 
  }


  //Function the path of a folder
  getFolderPath(folderID){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/getFolderPath/'+ folderID , this.options).map(res=>res.json()); 
  }


  //Function folder's files by name
  getFolderFileByName(folderName){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/getFoldersFileByName/'+ folderName , this.options).map(res=>res.json()); 
  }

  //Function folder's children folders by name
  getFolderChildrenByName(parentFolderName){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/childrenFoldersByName/'+ parentFolderName , this.options).map(res=>res.json()); 
  }


   //Function folder's path by name
   getFolderPathByName(folderName){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'folders/getFolderPathByName/'+ folderName , this.options).map(res=>res.json()); 
  }


   //Function to create new folders
   postFolder(folder){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.post(this.domain + 'folders/createfolder', folder, this.options).map(res=>res.json()); 
  }



  //Function for file download
  downloadFile(file:String){
    var body = {filename:file};

    return this._http.post(this.domain+'download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}

//Function to upload files
postFiles(file){
  this.createAuthenticationHeaders();   //create the header for the request
  return this.http.post(this.domain + 'folders/uploadfiles', file, this.options).map(res=>res.json()); 
}
  











}
