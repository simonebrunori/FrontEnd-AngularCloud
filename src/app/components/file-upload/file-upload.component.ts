import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';


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

  constructor(private formBuilder:FormBuilder) {
    this.createForm();  //create upload form
   }



    //Function to create upload form
   createForm(){
    var users=new FormControl([]);
    this.form=this.formBuilder.group({
      users,   //users
      file: [''],    //file
      description:['']    //description

    });
   }


  //delete
  prova(data: {value: string[]}){
    this.test=data.value;
    console.log(this.test);
  }


  

  ngOnInit() {
    this.options = {
      multiple: true
    }
    this.exampleData=[
      {
        id: "volvo",
        text:"Volvo"
      },
      {
        id: "fiat",
        text:"Fiat"
      }
    ]
  }

}
