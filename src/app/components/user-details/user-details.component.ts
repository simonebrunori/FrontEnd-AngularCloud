import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
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
      year:"",
      section:""
    }
  };

  class=false;
  form;


  constructor(private authService: AuthService, private acRoute: ActivatedRoute, private formBuilder: FormBuilder) { 
    this.createForm();
  }


  //Function to create angular reactive form
  createForm(){
    this.form=this.formBuilder.group({
      year: ['', Validators.required],
      section: ['', Validators.required]
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
  

    this.authService.addClassToStudent(this.userData._id, obj).subscribe(data=>{
      console.log(data.message);
    })


  }

  ngOnInit() {

    var id = this.acRoute.snapshot.params.id; // Get URL paramaters on page load
    this.getUserData(id);

    


  }

}
