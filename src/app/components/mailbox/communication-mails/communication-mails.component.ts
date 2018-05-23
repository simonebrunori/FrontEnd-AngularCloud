import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-communication-mails',
  templateUrl: './communication-mails.component.html',
  styleUrls: ['./communication-mails.component.css']
})
export class CommunicationMailsComponent implements OnInit {

  limit=14;
  skip=0;

  mails;
  startElement=0;
  endElement=0;

  constructor(private mailService:MailService) { }

  checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
  }
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
  }

  //Function to get COMMUNICATION user's email
  getCommunicationMails(){
    this.mailService.getCommunicationMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }
    })
  }

  //Function to refresh inbox
  refresh(){
    this.getCommunicationMails();  //Call getCommunicationMails function to get COMMUNICATION email on refresh button click
  }

  ngOnInit() {
    
    this.getCommunicationMails();  //get COMMUNICATION emails on component load

    

  }

}
