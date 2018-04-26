import { Component, AfterViewInit } from '@angular/core';
import {InitService} from '../../services/init.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    InitService.init();
  }

}
