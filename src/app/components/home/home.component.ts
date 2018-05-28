import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FolderService} from '../../services/folder.service';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students=0;
  teachers=0;
  files=0;
  mails=0;

  constructor(private authService: AuthService, private router:Router, private folderService: FolderService, private mailService:MailService) { }

  //Logout function
  logout(){
    this.authService.logout();  //call authService logout function 
    this.router.navigate(['/login']); 
  }

  ngOnInit() {

    this.authService.getTotalStudents().subscribe(data=>{
      this.students=data.count;
    })

    this.authService.getTotalTeachers().subscribe(data=>{
      this.teachers=data.count;
    })

    this.folderService.getFilesNumber().subscribe(data=>{
      this.files=data.count[0].count;
    })

    this.mailService.getTotalMailsNumber().subscribe(data=>{
      this.mails=data.count;
    })

    

  }

}
