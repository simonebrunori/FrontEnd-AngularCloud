import { Component, AfterViewInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../guard/auth.guard';
import {InitService} from '../../services/init.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  messageClass;
  message;
  processing=false;
  form;
  previousUrl;

  constructor(private router:Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private authGuard: AuthGuard
  ) {
    this.createForm();    //Create Login form when component is constructed
   }

   //Function to create login form
   createForm(){
     this.form=this.formBuilder.group({
       username: ['', Validators.required],   //Username
       password: ['', Validators.required]    //Password
     });
   }

   // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

   // Functiont to submit form and login user
   onLoginSubmit(){
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }
    
        // Function to send login data to API
        this.authService.login(user).subscribe(data => {
          // Check if response was a success or error
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Set bootstrap error class
            this.message = data.message; // Set error message
            this.processing = false; // Enable submit button
            this.enableForm(); // Enable form for editting
          } else {
            this.messageClass = 'alert alert-success'; // Set bootstrap success class
            this.message = data.message; // Set success message
            // Function to store user's token in client local storage
            this.authService.storeUserData(data.token, data.user);
            // After 2 seconds, redirect to dashboard page
            setTimeout(() => {
              // Check if user was redirected or logging in for first time
              if (this.previousUrl) {
                this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
              } else {
                this.router.navigate(['/dashboard/home']); // Navigate to dashboard view
              }
            }, 2000);
          }
        });
   }

   ngAfterViewInit() {

    InitService.init();

    $('body').addClass('sign-in-page');
     // On page load, check if user was redirected to login
     if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger'; // Set error message: need to login
      this.message = 'You must be logged in to view that page.'; // Set message
      this.previousUrl = this.authGuard.redirectUrl; // Set the previous URL user was redirected from
      this.authGuard.redirectUrl = undefined; // Erase previous URL
    }
  }

}
