import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  //Logout function
  logout(){
    this.authService.logout();  //call authService logout function 
    this.router.navigate(['/login']); 
  }

  ngOnInit() {
    

  }

}
