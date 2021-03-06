import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
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

  mails=[];
  startElement=0;
  endElement=0;
  userId;
  All=false;
  atLeastOneChecked=false;
  checkedMails=[];
  empty=false;

  mailsCount=0;
  disableNext=true;
  disablePrev=true;

  newMails=0;

  searchString=""

  

  constructor(private mailService:MailService, private authService: AuthService, private toastr:ToastrService) { }

  /*checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
    $('.icheckbox_flat-green').addClass('disabled');
    this.All=true;
  }
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
    $('.icheckbox_flat-green').removeClass('disabled');
    this.All=false;
  }*/

  //Control for delete and read buttons
  /*isValidCheck(){
    if(this.All || this.atLeastOneChecked){
      return true;
    }else{
      return false;
    }
  }*/


  //Function to add checked element to array
  checkOne(mailId){
    this.checkedMails.push(mailId);
    this.atLeastOneChecked=true;
  }

//Function to remove unchecked element to array
  unCheckOne(mailId){
    const index = this.checkedMails.indexOf(mailId);
    this.checkedMails.splice(index, 1);
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



  //Function to get all user's email
  getMails(){
    this.mailService.getMails(this.limit, this.skip).subscribe(data=>{
      this.checkReadMails(data.mails);
      this.getMailsCount();
    })
  }

  //Function to refresh inbox
  refresh(){
    this.searchString="";
    this.checkedMails=[];
    this.mails=[];
    this.atLeastOneChecked=false;
    this.getMails();  //Call getMails function to get all email on refresh button click
  }

  //function to check read emails
  checkReadMails(mails){
    
    mails.forEach(element => {
        element.sendees.forEach(sendeeElement => {
          if(sendeeElement.sendee.localeCompare(this.userId)==0){
            var Obj={
              _id: element._id,
              writtenAt: element.writtenAt,
              writtenBy: element.writtenBy,
              subject: element.subject,
              body: element.body,
              badge: element.badge,
              sendees: element.sendees,
              read: sendeeElement.read      
            };
            this.mails.push(Obj);
          }
        });
    });
  }



  //Function to delete mails
  deleteMail(){
    this.checkedMails.forEach(element => {
      this.mailService.deleteMail(element).subscribe(data=>{
        console.log(data.message);
      })
    });
    this.refresh();   //after update refresh the inbox
  }


  //Function to move to previous page in pagination
  previous(){
    if(this.skip-this.limit>=0){
      if(this.searchString==""){
        this.skip=this.skip-this.limit;
        this.refresh();
      }else{
        this.skip=this.skip-this.limit;
        this.searchMails();
      }
      
      
    } 
  }

  //Function to move to next page in pagination
  next(){
    if(this.searchString==""){
      this.skip=this.skip+this.limit;
      this.refresh();
    }else{
      this.skip=this.skip+this.limit;
      this.searchMails();
    }
    
  }

  //Function to get mails count
getMailsCount(){
  this.mailService.getInboxMailCount().subscribe(data=>{
    this.mailsCount=data.count;
    if(this.mails.length!=0){   //control to disable pagination
      this.empty=false;
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

//Function to search emails by writer
searchMails(){
  this.mails=[];
  //search if search string is not null
  if(this.searchString!=""){
    this.mailService.searchWriter(this.searchString,this.limit,this.skip).subscribe(data=>{
      this.checkReadMails(data.mails);
      this.getSearchMailsCount();   //
    })
  }else{
    this.skip=0;
    //If searchstrin is null get all mails
    this.getMails();
  }
  
}

//Function to get search mail count for pagination
getSearchMailsCount(){
  this.mailService.searchMailCount(this.searchString).subscribe(data=>{
    this.mailsCount=data.count;
    if(this.mails.length!=0){   //control to disable pagination
      this.empty=false;
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




  ngOnInit() {


    //Get the userID to check if email are read
    this.authService.getProfile().subscribe(data=>{
      this.userId=data.user._id;
      this.getMails();  //get all emails on component load
    })


    //Get the number of new mails
    this.mailService.getNewMailCount().subscribe(data=>{
      this.newMails=data.count;
    })
    
    

    

  }

}
