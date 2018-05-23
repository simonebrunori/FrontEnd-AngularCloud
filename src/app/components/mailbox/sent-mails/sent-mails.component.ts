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

  constructor(private mailService:MailService) { }

  checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
  }
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
  }

  //Function to get SENT user's email
  getSentMails(){
    this.mailService.getSentMails(this.limit, this.skip, this.user).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
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
