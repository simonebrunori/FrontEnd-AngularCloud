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


  //Function to get NEW mails
  getNewMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailNew/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }

  //Function to get TRASH mails
  getTrashMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailTrash/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }


  //Function to get IMPORTANT mails
  getImportantMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailImportant/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }

  //Function to get user COMMUNICATION
  getCommunicationMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailCommunication/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }

  //Function to get HOMEWORK mails
  getHomeworkMails(limit, skip){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailHomework/'+limit+'/'+skip, this.options).map(res=>res.json()); 
  }

  //Function to get SENT mails
  getSentMails(limit, skip, user){
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.get(this.domain + 'mails/mailSent/'+limit+'/'+skip+'/'+user, this.options).map(res=>res.json()); 
  }


   //Function to set mail as read
   setMailRead(mailId){
     const mailData={
        mailId: mailId
     }
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.put(this.domain + 'mails/mailRead',mailData, this.options).map(res=>res.json()); 
  }

//Function to set ALL mails as read
  // setAllMailAsRead(){
  //   this.createAuthenticationHeaders();   //create the header for the request
  //   return this.http.get(this.domain + 'mails/allMailRead', this.options).map(res=>res.json()); 
  // }

  //Function to DELETE mail
  deleteMail(mailId){
    const mailData={
      mailId: mailId
   }
    this.createAuthenticationHeaders();   //create the header for the request
    return this.http.put(this.domain + 'mails/mailDelete', mailData , this.options).map(res=>res.json()); 
  }
  

}
