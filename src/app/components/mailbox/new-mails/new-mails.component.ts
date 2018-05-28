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
  empty=false;
  atLeastOneChecked=false;
  checkedMails=[];


  mailsCount=0;
  disableNext=true;
  disablePrev=true;


  constructor(private mailService:MailService) { }

  // checkAll(){
  //   $('.icheckbox_flat-green').addClass('checked');
  // }
  // unCheckAll(){
  //   $('.icheckbox_flat-green').removeClass('checked');
  // }

    //Function to add checked element to array
    checkOne(mailId){
      this.checkedMails.push(mailId);
      console.log(this.checkedMails);
      this.atLeastOneChecked=true;
    }
  
  //Function to remove unchecked element to array
    unCheckOne(mailId){
      const index = this.checkedMails.indexOf(mailId);
      this.checkedMails.splice(index, 1);
      console.log(this.checkedMails);
      if(this.checkedMails.length==0){
        this.atLeastOneChecked=false;
      }
    }
  
  
    //Function to set emails as read on button click
    setAsRead(){
      // if(this.All){
      //   this.mailService.setAllMailAsRead().subscribe(data=>{
      //       console.log(data.message);
      //       this.unCheckAll();
      //   })
      // }else{
        this.checkedMails.forEach(element => {
          this.mailService.setMailRead(element).subscribe(data=>{
              console.log(data.message);
          })       
        });
      // }
      this.refresh(); 
    }

  //Function to get NEW user's email
  getNewMails(){
    this.mailService.getNewMails(this.limit, this.skip).subscribe(data=>{
      this.mails=data.mails;
      this.getMailsCount();     
    })
  }

    //Function to delete mails
    deleteMail(){
      this.checkedMails.forEach(element => {
        this.mailService.deleteMail(element).subscribe(data=>{
          console.log(data.message);
        })
      });
      this.refresh(); 
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
  this.mailService.getNewMailCount().subscribe(data=>{   
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
    this.checkedMails=[];
    this.mails=[];
    this.atLeastOneChecked=false;
    this.getNewMails();  //Call getNewMails function to get NEW email on refresh button click
  }

  ngOnInit() {
    
    this.getNewMails();  //get NEW emails on component load

    

  }

}
