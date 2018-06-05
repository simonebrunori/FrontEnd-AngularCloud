import { Component, AfterViewInit, OnInit } from '@angular/core';
import {InitService} from '../../services/init.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnInit {


  public userType="";

  constructor() { }

  ngAfterViewInit() {
    InitService.init();
    
  }
  ngOnInit(){
    this.userType=localStorage.getItem('type'); //load user type to browser local storage
console.log(this.userType);
    
  }

}
