import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {FolderService} from '../../services/folder.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


    //"assets/plugins/iCheck/icheck.js",  "assets/plugins/iCheck/skins/square/_all.css", 
  fileName=[]; 



  domain=environment.domain;   //test domain

  test:any;
  form;

  constructor(private folderService:FolderService, private formBuilder:FormBuilder, private toastr: ToastrService) {
    this.createFileForm();
   }



   //Function to create file form for file upload
   createFileForm(){
    this.form=this.formBuilder.group({
      file: [''],   //file
      description:['']    //file description
    });
   }


   public uploader:FileUploader = new FileUploader({url:this.domain+'upload'});   //Define uploader component


   @Input('fManagerData') folderPath: string;   //take folderPath from parent component(file-manager)



   //Upload multiple files
   //Function to save filename temporally
   uploadFiles(){
    this.uploader.uploadAll();
    var i=0;
    this.uploader.queue.forEach(element => {    //for each files...
      // console.log(element.file.name);
      this.fileName[i]=element.file.name;   //save filename
      i++;
    });   
   }



   //Function to reset all the form on closing
   reset(){
    this.uploader.clearQueue();
    this.form.reset();
    
   }


   //Function to store file data in database
   uploadFile(){

    console.log(this.fileName);
    this.fileName.forEach(element => {    //for each element in array...
      //Create file object
      const file={
        filename: element,
        folderPath: this.folderPath,
        path:element,
        uploadedBy: this.folderService.getUsername(),
        description: this.form.get('description').value
      }

      console.log(file);
      //Call function postFiles() of FolderService
      this.folderService.postFiles(file).subscribe(data=>{ 
        if(!data.success){
          this.toastr.error('Error!', data.message,{timeOut: 3000, closeButton:true});
        }else{
          this.toastr.success('Success!', data.message,{timeOut: 3000, closeButton:true});
        }
        this.getFiles(this.folderPath);
      });
    });

    $('#uploadModal').modal('toggle');

    this.reset();

    

    
   }


   getFiles(path){
     var name=path.split('/');
    this.folderService.getFolderFileByName(name[name.length-2]).subscribe(data=>{ 
      this.sendData(data.files[0].files);
      })
   }
    


   @Output('files') outgoingData = new EventEmitter<string>();


   public sendData(files){
		this.outgoingData.emit(files);
	}
  

  ngOnInit() {

    $('.dropzone').addClass('dz-clickable');


  }

}
