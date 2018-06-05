import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user={
    subjects:[],
    TODO: false,
    TE:false
  };
  subjects=[];

  constructor(private authService: AuthService) { }




  //Functio to call viewHideTodo service
  viewHideTodo(){
    this.authService.viewHideTodo(this.user.TODO).subscribe(data=>{
      console.log(data.message);
    })
  }

  //Functio to call viewHideTE service
  viewHideTe(){
    this.authService.viewHideTE(this.user.TE).subscribe(data=>{
      console.log(data.message);
    })
  }



  ngOnInit() {
    this.authService.getProfile().subscribe(data=>{
      this.user=data.user;
    });
  }

}
