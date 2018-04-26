import { Component, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import { InitService } from './services/init.service';
declare var moment: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  constructor(private router: Router){
    router.events.subscribe(function(){
      InitService.initCommon();
      window.scrollTo(0,0);
    });
  }

  ngAfterViewInit(){

  }
}
