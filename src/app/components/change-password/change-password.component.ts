import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  form;
  comparePasswordValid;
  comparePasswordMessage;
  oldPasswordValid;
  oldPasswordMessage;
  processing=false;


  constructor(private formBuilder: FormBuilder,private authService:AuthService,private toastr: ToastrService, private router: Router) {
    this.createForm();
   }



   //Function to create angular reactive form
  createForm(){
    this.form=this.formBuilder.group({
      about: ['', Validators.compose([
        Validators.maxLength(500),    //Maximum length is 500 characters
        Validators.required])],   //about
      oldPassword: ['', Validators.required],   //old password
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],   //password
      confirm: ['', Validators.required]   //confirm
    },{ validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords);

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

//Function to check if new password is equal to old password
comparePasswords(){
  this.authService.comparePasswords(this.form.get('password').value).subscribe(data=>{
    if(!data.success){
      this.comparePasswordValid=true;
      this.comparePasswordMessage="Passwords match";
    }else{
      this.comparePasswordValid=false;
      this.comparePasswordMessage="New password and old password can't match";
    }
  })
}

//Function to check if old password is user's password
validOldPassword(){
  this.authService.comparePasswords(this.form.get('oldPassword').value).subscribe(data=>{
    if(!data.success){
      this.oldPasswordValid=false;
      this.oldPasswordMessage="Password not match";
    }else{
      this.oldPasswordValid=true;
      this.oldPasswordMessage="Password match";
    }
  })
}


// Function to disable the registration form
disableForm() {
  this.form.controls['oldPassword'].disable();
  this.form.controls['about'].disable();
  this.form.controls['password'].disable();
  this.form.controls['confirm'].disable();
}

// Function to enable the registration form
enableForm() {
  this.form.controls['oldPassword'].enable();
  this.form.controls['confirm'].enable();
  this.form.controls['password'].enable();
  this.form.controls['about'].enable();
}


//Functio to submit new password
changePassword(){
  this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      about: this.form.get('about').value, // About input field
      password: this.form.get('password').value // Password input field
    }

    console.log(user);

    // Function from authentication service to register user
      this.authService.changePassword(user).subscribe(data => {
        console.log(data.message);
        // Resposne from registration attempt
        if (!data.success) {

          this.toastr.error( data.message ,'Error!',{timeOut: 3000, closeButton:true});      
          this.processing = false; // Re-enable submit button
          this.enableForm(); // Re-enable form
          this.form.reset();
        } else {
          this.toastr.success( data.message ,'Success!',{timeOut: 3000, closeButton:true}); 
          this.authService.logout();
          setTimeout(() => {
            $('#changePassword').modal('toggle');
           this.router.navigate(['/login']); // Redirect to login view
         }, 2000);
        }
      });

}



  ngOnInit() {
  }

}
