import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailService} from '../../../services/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {


  public mail="";
  previousUrl;
  disable=false;

  constructor(private acRoute: ActivatedRoute, private mailService: MailService) { }


  //Function to get mail content
  getMail(mailId){
    this.mailService.getMail(mailId).subscribe(data=>{
      this.mail=data.mail;
    });
  }



  ngOnInit() {
    var mailId = this.acRoute.snapshot.params.mailId; // Get URL paramaters on page load
    this.previousUrl = this.acRoute.snapshot.params.previousUrl; // Get URL paramaters on page load
    this.getMail(mailId);   //get mail content on component load

    if(this.previousUrl==='sent' || this.previousUrl==='trash'){
      this.disable=true;
    }
  }

}
