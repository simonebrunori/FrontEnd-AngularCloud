import { Component, OnInit} from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { ToastrService } from 'ngx-toastr';
import {saveAs} from 'file-saver';

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
  filename="";


  constructor(private folderService: FolderService, private toastr: ToastrService) { }


  expand(){
    if(!this.fullscreen){
      $('#texted').addClass('panel-fullscreen');
      this.fullscreen=true;
    }else{
      $('#texted').removeClass('panel-fullscreen');
      this.fullscreen=false;
    }
    
  }

  //Function to discard filename
  discard(){
    $('#smallModal').on('hidden.bs.modal', function(){
      $(this).find('form')[0].reset();
    });
  }


  //Function to export content to pdf file
  exportToPdf(){

    var file={
      text:this.content,
      filename:this.filename
    }

    this.folderService.createPdf(file).subscribe(data=>{
      if(!data.success){
        this.toastr.error(data.message, 'Error!' ,{timeOut: 3000, closeButton:true});
      }else{
        this.toastr.success(data.message, 'Success!' ,{timeOut: 3000, closeButton:true});
        this.folderService.downloadFile(this.filename+'.pdf').subscribe(
          data => saveAs(data, this.filename),
          error => console.error(error)
        );
      }

      $('#smallModal').modal('toggle');    //toggle modal

    })
  }


  ngOnInit() {

  }
}
