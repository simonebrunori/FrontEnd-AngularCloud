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
  empty=false;


  mailsCount=0;
  disableNext=true;
  disablePrev=true;

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
    this.mailService.getTrashMailCount().subscribe(data=>{
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
    this.getTrashMails();  //Call getTrashMails function to get TRASH email on refresh button click
  }

  ngOnInit() {
    
    this.getTrashMails();  //get TRASH emails on component load

    

  }

}
