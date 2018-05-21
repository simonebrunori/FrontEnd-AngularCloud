import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  limit=14;
  skip=0;

  mails;
  startElement;
  endElement;

  constructor(private mailService:MailService) { }

  checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
  }
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
  }

  //Function to get all user's email
  getMails(){
    this.mailService.getMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      this.startElement=this.skip+1;
      this.endElement=this.mails.length;
    })
  }

  //Function to refresh inbox
  refresh(){
    this.getMails();  //Call getMails function to get all email on refresh button click
  }

  ngOnInit() {
    
    this.getMails();  //get all emails on component load

    

  }

}
