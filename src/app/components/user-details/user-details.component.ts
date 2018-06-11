import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FolderService } from '../../services/folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  userData={
    _id:"",
    name:"",
    surname:"",
    city:"",
    type:"",
    gender:"",
    email:"",
    username:"",
    birthDate:"",
    major:"",
    clas:{
      year: 0,
      section:""
    },
    classes:[]
  };

  class=false;
  form;
  formT;


  constructor(private authService: AuthService, private acRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private folderService: FolderService) { 
    this.createForm();
    this.createFormT();
  }


  //Function to create angular reactive form
  createForm(){
    this.form=this.formBuilder.group({
      year: ['', Validators.required],
      section: ['', Validators.required]
    }); 

  }



  //Function to create angular reactive form
  createFormT(){
    this.formT=this.formBuilder.group({
      year: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['',Validators.required]
    }); 

  }


  //Function to get user's data
  getUserData(id){
    //Call getUserData service
    this.authService.getUserData(id).subscribe(data=>{
      this.userData=data.user;
      if(this.userData.clas!=undefined){
        this.class=true;
      }else{
        this.class=false;
      }

    })
  }



  //Function to add class to student user
  addClass(){

    var obj={
      clas:{
        year: this.form.get('year').value,
        section: this.form.get('section').value
      }
    }
  
    //Call service to add student
    this.authService.addClassToStudent(this.userData._id, obj).subscribe(data=>{
      console.log(data.message);
    })
    this.router.navigateByUrl('/dashboard/usersList');
  }


  //Function to add classes to teacher users
  addClassT(){
    var obj={
      year: parseInt(this.formT.get('year').value),
      section: this.formT.get('section').value,
      subject: this.formT.get('subject').value   
    }

    this.userData.classes.push(obj);

    //Create folder for class
    var folder={
      createdBy:this.userData._id,
      clas: obj,
    };
    this.folderService.newClassFolder(folder).subscribe(data=>{
      console.log(data.message);
    })

    this.formT.reset();
  }

  //Function to delete class from teacher's classes array
  deleteClassT(index){

    
    this.folderService.deleteFolder(this.userData.classes[index].subject+' '+this.userData.classes[index].year+this.userData.classes[index].section).subscribe(data=>{
      console.log(data.message);
    })

    this.userData.classes.splice(index, 1); //array splice 
  }


  //Function to post user data in the database
  postTData(){
    var obj={
      classes:this.userData.classes
    }
    //Call service to save classes
    this.authService.addClassToTeacher(this.userData._id, obj).subscribe(data=>{
      console.log(data.message);
    });

    this.router.navigateByUrl('/dashboard/usersList');

    
  }

  ngOnInit() {

    var id = this.acRoute.snapshot.params.id; // Get URL paramaters on page load
    this.getUserData(id);

    


  }

}
