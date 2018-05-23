import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-trash-mails',
  templateUrl: './trash-mails.component.html',
  styleUrls: ['./trash-mails.component.css']
})
export class TrashMailsComponent implements OnInit {

  limit=14;
  skip=0;

  mails;
  startElement=0;
  endElement=0;

  constructor(private mailService:MailService) { }

  //Function to check all checkbox
  checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
  }
  //Function to uncheck all the checkbox
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
  }

  //Function to get TRASH user's email
  getTrashMails(){
    this.mailService.getTrashMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }

    })
  }

  //Function to refresh inbox
  refresh(){
    this.getTrashMails();  //Call getTrashMails function to get TRASH email on refresh button click
  }

  ngOnInit() {
    
    this.getTrashMails();  //get TRASH emails on component load

    

  }

}
