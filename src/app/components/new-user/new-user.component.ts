import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  type="";
  date="";
  form;
  usernameMessage;
  usernameValid;
  processing=false;


  constructor(private formBuilder: FormBuilder,private authService:AuthService,private toastr: ToastrService) { 
    this.createForm();
  }


  //Function to create angular reactive form
  createForm(){
    this.form=this.formBuilder.group({
      type: ['', Validators.required],   //Type
      name: ['', Validators.required],    //Name
      surname: ['', Validators.required],    //Surname
      city: ['', Validators.required],   //city
      gender: ['', Validators.required],   //gender
      birthdate: ['', Validators.required],   //birthdate
      major: ['', Validators.required],   //major
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsername // Custom validation
      ])],   //username
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],   //email
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],   //password
      confirm: ['', Validators.required]   //confirm
    },{ validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords);

  }



    // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }



  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }



  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }



  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }



   // Function to check if username is available
   checkUsername() {
    // Function from authentication file to check if username is taken
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.usernameValid = false; // Return username as invalid
        this.usernameMessage = data.message; // Return error message
      } else {
        this.usernameValid = true; // Return username as valid
        this.usernameMessage = data.message; // Return success message
      }
    });
  }


  // Function to submit form
  onRegisterSubmit() {
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      type: this.form.get('type').value, // Type input field
      name: this.form.get('name').value, // Name input field
      surname: this.form.get('surname').value, // Surname input field
      city: this.form.get('city').value, // City input field
      gender: this.form.get('gender').value, // Gender input field
      birthDate: this.date, // Birthdate input field
      major: this.form.get('major').value, // Major input field
      email: this.form.get('email').value, // E-mail input field
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    console.log(user);

    // Function from authentication service to register user
     this.authService.registerUser(user).subscribe(data => {
       console.log(data.message);
       // Resposne from registration attempt
       if (!data.success) {

         this.toastr.error( data.message ,'Error!',{timeOut: 3000, closeButton:true});      
         this.processing = false; // Re-enable submit button
         this.enableForm(); // Re-enable form
       } else {
         this.toastr.success( data.message ,'Success!',{timeOut: 3000, closeButton:true}); 
         this.processing=false;     
         this.enableForm(); // Re-enable form
       }
     });

    this.form.reset();

  }


  // Function to disable the registration form
  disableForm() {
    this.form.controls['type'].disable();
    this.form.controls['name'].disable();
    this.form.controls['surname'].disable();
    this.form.controls['city'].disable();
    this.form.controls['gender'].disable();
    this.form.controls['birthdate'].disable();
    this.form.controls['major'].disable();
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['type'].enable();
    this.form.controls['name'].enable();
    this.form.controls['surname'].enable();
    this.form.controls['city'].enable();
    this.form.controls['gender'].enable();
    this.form.controls['birthdate'].enable();
    this.form.controls['major'].enable();
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  ngOnInit() {
    $(function () {
      $('#datetimepicker1').datetimepicker({
        format: 'L'
      });
  });
  }

}
