import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = "";


  constructor(private router: Router,
    private authService: AuthService) { }

  //Logout function
  logout() {
    this.authService.logout(); //call authService logout function 
    this.router.navigate(['/login']);
  }

  ngOnInit() {

    $('body').addClass('navbar-fixed ls-fixed');
    // Once component loads, get username to display on navbar
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
    });
  }

}
