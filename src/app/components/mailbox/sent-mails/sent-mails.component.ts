import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sent-mails',
  templateUrl: './sent-mails.component.html',
  styleUrls: ['./sent-mails.component.css']
})
export class SentMailsComponent implements OnInit {


  limit=14;
  skip=0;

  mails;
  startElement=0;
  endElement=0;
  user;
  empty=false;


  mailsCount=0;
  disableNext=true;
  disablePrev=true;

  constructor(private mailService:MailService) { }

 
  //Function to get SENT user's email
  getSentMails(){
    this.mailService.getSentMails(this.limit, this.skip, this.user).subscribe(data=>{
      this.mails=data.mails;
      this.getMailsCount();
    })
  }


  //Function to move to previous page in pagination
  previous(){
    if(this.skip-this.limit>=0){
      this.skip=this.skip-this.limit;
      this.refresh();
      
    } 
  }

  //Function to move to next page in pagination
  next(){
    this.skip=this.skip+this.limit;
    this.refresh();
  }

  //Function to get mails count
getMailsCount(){
  this.mailService.getSentMailCount(this.user).subscribe(data=>{
    this.mailsCount=data.count;
    if(this.mails.length!=0){   //control to disable pagination
      this.startElement=this.skip+1;
      this.endElement=this.startElement+this.mails.length-1;
      if(this.startElement<this.limit+1){
        this.disablePrev=true;
      }else{
        this.disablePrev=false;
      }
      if(this.endElement==this.mailsCount){
        this.disableNext=true;
      }else{
        this.disableNext=false;
      }
    }else{
      this.disableNext=true;
      this.empty=true;
    }
  })
}

  //Function to refresh inbox
  refresh(){
    this.getSentMails();  //Call getSentMails function to get SENT email on refresh button click
  }

  ngOnInit() {
    
    this.user=localStorage.getItem('username'); //Get username from localstorage
    this.getSentMails();  //get SENT emails on component load
    

    

  }

}
