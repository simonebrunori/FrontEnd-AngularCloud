import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()
export class MailService {

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


  //Function to send email
  SendEmail(mail){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.post(this.domain + 'mails/sendEmail', mail, this.options).map(res=>res.json()); 
  }

  //Function to add classes to email
  addSendeesClass(clas, mailId){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.put(this.domain + 'mails/addSendeesClass/'+mailId, clas, this.options).map(res=>res.json()); 
  }

  //Function to add users email
  addSendees(sendee,mailId){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.put(this.domain + 'mails/addSendees/'+mailId, sendee, this.options).map(res=>res.json()); 
  }

  //Function to get user mails
  getMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailInbox/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }

  //Function to get email
  getMail(mailId){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mail/'+mailId, this.options).map(res=>res.json()); 
  }
  

}
