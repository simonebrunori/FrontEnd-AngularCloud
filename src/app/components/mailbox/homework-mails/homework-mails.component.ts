import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-homework-mails',
  templateUrl: './homework-mails.component.html',
  styleUrls: ['./homework-mails.component.css']
})
export class HomeworkMailsComponent implements OnInit {


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

  //Function to get HOMEWORK user's email
  getHomeworkMails(){
    this.mailService.getHomeworkMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }
    })
  }

  //Function to refresh inbox
  refresh(){
    this.getHomeworkMails();  //Call getHomeworkMails function to get HOMEWORK email on refresh button click
  }

  ngOnInit() {
    
    this.getHomeworkMails();  //get HOMEWORK emails on component load

    

  }

}
