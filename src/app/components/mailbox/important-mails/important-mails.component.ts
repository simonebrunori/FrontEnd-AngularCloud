import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-important-mails',
  templateUrl: './important-mails.component.html',
  styleUrls: ['./important-mails.component.css']
})
export class ImportantMailsComponent implements OnInit {


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

  //Function to get IMPORTANT user's email
  getImportantMails(){
    this.mailService.getImportantMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }
    })
  }

  //Function to refresh inbox
  refresh(){
    this.getImportantMails();  //Call getImportantMails function to get IMPORTANT email on refresh button click
  }

  ngOnInit() {
    
    this.getImportantMails();  //get IMPORTANT emails on component load

    

  }

}
