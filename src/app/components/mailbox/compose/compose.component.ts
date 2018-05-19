import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import {ClassService} from '../../../services/class.service';
import { AuthService} from '../../../services/auth.service';
import { MailService} from '../../../services/mail.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  public selectArrayClasses: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public selectArrayStudents: Array<Select2OptionData>;


  subject="";
  users=[];
  classes=[];
  user;


  constructor(private classService:ClassService, private authService: AuthService, private mailService: MailService, private router:Router, private toastr:ToastrService) { }

  //Function to send Email
  sendEmail(){
    var textareaValue = $('#summernote').summernote('code');

    if(this.users.length==0 && this.classes.length==0){
      this.toastr.error('You must provide at least a class or a sendee', 'Error!',{timeOut: 3000, closeButton:true});
    }else{
      //create mail object
        var mail={
          subject:this.subject,
          writtenBy: this.user,
          body: textareaValue
        };
        this.postEmail(mail);   //call postEmail() function to add new email
        this.toastr.success('Mail sent','Success!',{timeOut: 3000, closeButton:true});
        this.router.navigate(['/dashboard/mailbox/inbox']); // Navigate to inbox
        
    }
    
  }

  //Function to send email to database
  postEmail(mail){
    this.mailService.SendEmail(mail).subscribe(data=>{
      if(!data.success){
        this.toastr.error(data.message,'Error!', {timeOut: 3000, closeButton:true});
      }
      console.log('postEmail: '+data.message);
      if(this.classes.length==0){
        this.users.forEach(element => {
          this.putSendees({sendee:element}, data.mail);
        });
      }else{
        if(this.users.length==0){
          this.classes.forEach(element => {
            this.putClasses({clas:element},data.mail);
          });
        }else{
          this.classes.forEach(element => {
            this.putSendeesClasses({clas:element},data.mail);
          });

        }
      }
    })
  }


//Function to put sendees in mail entity (users)
  putSendees(sendee, mailId){
    this.mailService.addSendees(sendee, mailId).subscribe(data=>{
      if(!data.success){
        this.toastr.error(data.message,'Error!', {timeOut: 3000, closeButton:true});
      }
      console.log('Put Sendees: '+data.message);
    })
  }

  //Function to put sendees in mail entity (classes)
  putClasses(clas, mailId){
    console.log(clas);
    this.mailService.addSendeesClass(clas, mailId).subscribe(data=>{
      if(!data.success){
        this.toastr.error(data.message,'Error!', {timeOut: 3000, closeButton:true});
      }
      console.log('PutClasses: '+data.message);
    })
  }

  //Function to put sendees in mail entity (users and classes)
  putSendeesClasses(clas, mailId){
    this.mailService.addSendeesClass(clas,mailId).subscribe(data=>{
      if(!data.success){
        this.toastr.error(data.message,'Error!', {timeOut: 3000, closeButton:true});
      }
        console.log('Put sendeesClasses: '+data.message);
        this.users.forEach(element => {
          this.putSendees({sendee:element},mailId);
        });
    })

  }
  





  //Function to add values to classes array on changes of the select2
  changedClasses(data: {value: string[]}){

    this.classes=[];
    if(data.value!=null){
      
      data.value.forEach(element => { //foreach element of select2 array add alemnt to classes array
        var s= element.split('|');
        var Obj={   //make class object
          year:s[0],
          section:s[1]
        }
        this.classes.push(Obj);   //push object to array

      });
    }
  }

  //Function to add values to users array on select2 change 
  changedUsers(data: {value: string[]}){
    this.users=[];
    if(data.value!=null){
      data.value.forEach(element => { //foreach element of select2 array add alement to users array
        this.users.push(element);   //push element to array
      });
    }
    console.log(this.users);
  }


  //Function to get all classes and to fill select2
  getClasses(){
    //Call the api to get classes
    this.classService.getTeacherClasses().subscribe(data=>{ 
      var i=0;
      this.selectArrayClasses=[];
      data.classes[0].classes.forEach(element => {  //for each element of result add element in select2 data array
        this.selectArrayClasses.push({
          id:element.year+'|'+element.section, 
          text:element.year+'° '+element.section});
      });
    })
  }

//Function to get all users and to fill select2
  getUsers(){
    this.authService.getProfile().subscribe(data=>{
      //Call the api to get classes
      this.authService.getAllUsers(data.user.username).subscribe(data=>{ 
        console.log(data);
        var i=0;
        this.selectArrayStudents=[];
        data.users.forEach(element => {  //for each element of result add element in select2 data array
          this.selectArrayStudents.push({
          id:element._id, 
          text:element.name+' '+element.surname});
        });
      });
    });
  }



  ngOnInit() {
    $('#summernote').summernote({
      height: '500'
    });

    //get usernmame
    this.authService.getProfile().subscribe((data)=>{
      this.user=data.user.username;
    });


    this.getClasses();  //get classes for select2
    this.getUsers();  //get users for select2

    //select2 options
    this.options = {
      multiple: true
    }
  }

}
