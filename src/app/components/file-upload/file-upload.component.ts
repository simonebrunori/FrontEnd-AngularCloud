import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {FolderService} from '../../services/folder.service';
import {saveAs} from 'file-saver';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {



  fileName; //delete



  domain=environment.domain;   //test domain

  test:any;
  form;

  constructor(private folderService:FolderService) {
   }


   public uploader:FileUploader = new FileUploader({url:this.domain+'upload'});   //Define uploader component



   //Upload multiple files
   uploadFiles(){
    this.uploader.uploadAll();
    console.log(this.uploader.queue[0].file.name);
    this.fileName=this.uploader.queue[0].file.name;
   }


   //Upload single item
   uploadItem(item){
    item.upload();
   }


   //Function to reset all the form on closing
   reset(){
    this.uploader.clearQueue();
    this.folderService.downloadFile(this.fileName)
    .subscribe(
        data => saveAs(data, this.fileName),
        error => console.error(error)
    );
   }
    

  

  ngOnInit() {

    $('.dropzone').addClass('dz-clickable');


  }

}
