import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService} from '../../../services/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {


  public mail={
    _id:''
  };
  previousUrl;
  disable=false;

  constructor(private acRoute: ActivatedRoute, private mailService: MailService, private router: Router) { }


  //Function to get mail content
  getMail(mailId){
    this.mailService.getMail(mailId).subscribe(data=>{
      this.mail=data.mail;
      this.readMail();
    });
  }


  //Function to set mail as read
  readMail(){
    if( this.previousUrl.localeCompare('sent')!=0 || this.previousUrl.localeCompare('trash')!=0){
      this.mailService.setMailRead(this.mail._id).subscribe(data=>{
          console.log(data.message);

      })
  }
}

deleteMail(){
    this.mailService.deleteMail(this.mail._id).subscribe(data=>{
      console.log(data.message);
      if(data.success){
        this.router.navigateByUrl('/dashboard/mailbox/'+this.previousUrl);
      }
    })
}



  ngOnInit() {
    var mailId = this.acRoute.snapshot.params.mailId; // Get URL paramaters on page load
    this.previousUrl = this.acRoute.snapshot.params.previousUrl; // Get URL paramaters on page load
    this.getMail(mailId);   //get mail content on component load

    if(this.previousUrl.localeCompare('sent')==0 || this.previousUrl.localeCompare('trash')==0){
      this.disable=true;
    }
}

}
