import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-new-mails',
  templateUrl: './new-mails.component.html',
  styleUrls: ['./new-mails.component.css']
})
export class NewMailsComponent implements OnInit {


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

  //Function to get NEW user's email
  getNewMails(){
    this.mailService.getNewMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }
    })
  }

  //Function to refresh inbox
  refresh(){
    this.getNewMails();  //Call getNewMails function to get NEW email on refresh button click
  }

  ngOnInit() {
    
    this.getNewMails();  //get NEW emails on component load

    

  }

}
