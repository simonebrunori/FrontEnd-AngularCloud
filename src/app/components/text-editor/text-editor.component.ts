import { Component, OnInit} from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  fullscreen=false;
  content="";


  constructor() { }


  expand(){
    if(!this.fullscreen){
      $('#texted').addClass('panel-fullscreen');
      this.fullscreen=true;
    }else{
      $('#texted').removeClass('panel-fullscreen');
      this.fullscreen=false;
    }
    
  }


  ngOnInit() {

  }
}
