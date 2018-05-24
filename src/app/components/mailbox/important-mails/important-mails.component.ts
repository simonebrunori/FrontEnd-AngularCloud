import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';
import { AuthService } from '../../../services/auth.service';
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

  mails=[];
  startElement=0;
  endElement=0;
  userId;

  constructor(private mailService:MailService,private authService: AuthService) { }

  checkAll(){
    $('.icheckbox_flat-green').addClass('checked');
  }
  unCheckAll(){
    $('.icheckbox_flat-green').removeClass('checked');
  }

  //Function to get IMPORTANT user's email
  getImportantMails(){
    this.mailService.getImportantMails(this.limit, this.skip).subscribe(data=>{
      console.log(data.mails);
      this.checkReadMails(data.mails);
      if(data.mails.length!=0){
        this.startElement=this.skip+1;
        this.endElement=this.mails.length;
      }
    })
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

  //Function to refresh inbox
  refresh(){
    this.mails=[];
    this.getImportantMails();  //Call getImportantMails function to get IMPORTANT email on refresh button click
  }

  ngOnInit() {

        //Get the userID to check if email are read
        this.authService.getProfile().subscribe(data=>{
          this.userId=data.user._id;
          console.log(this.userId);
          this.getImportantMails();  //get IMPORTANT emails on component load
        })
    
    

    

  }

}
