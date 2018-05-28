import { Component, OnInit } from '@angular/core';
import { MailService } from '../../../services/mail.service';

@Component({
  selector: 'app-mail-sidebar',
  templateUrl: './mail-sidebar.component.html',
  styleUrls: ['./mail-sidebar.component.css']
})
export class MailSidebarComponent implements OnInit {


  newMails=0;
  newImportant=0;
  newCommunication=0;
  newHomework=0;

  constructor(private mailService: MailService) { }

  ngOnInit() {


    //get new email number
    this.mailService.getNewMailCount().subscribe(data=>{
      this.newMails=data.count;
    })

    //get new important email number
    this.mailService.getNewImportantMailCount().subscribe(data=>{
      this.newImportant=data.count;
    })

    //get new homework email number
    this.mailService.getNewHomeworkMailCount().subscribe(data=>{
      this.newHomework=data.count;
    })

    //get new communication email number
    this.mailService.getNewCommunicationMailCount().subscribe(data=>{
      this.newCommunication=data.count;
    })
  }

}
