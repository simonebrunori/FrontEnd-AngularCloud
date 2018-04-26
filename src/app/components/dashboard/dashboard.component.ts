import { Component, AfterViewInit } from '@angular/core';
import {InitService} from '../../services/init.service';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    $('body').removeClass('sign-in-page');
  }

}
