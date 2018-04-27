import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];

  test:any;
  form;

  constructor() {
   }



    


  //delete
  // prova(data: {value: string[]}){
  //   this.test=data.value;
  //   console.log(this.test);
  // }


  

  ngOnInit() {

    $('.dropzone').addClass('dz-clickable');


  }

}
