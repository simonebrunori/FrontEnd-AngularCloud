import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Select2OptionData } from 'ng2-select2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  public value: string[];
  public options: Select2Options;
  folders;
  user;
  files;
  fileInfos="";
  fileUsers="";

  constructor(private folderService:FolderService) {
    
   }

  //JQuery sidebar event
  toggleSidebar(name){
      $('.right-sidebar').addClass('open');
      this.getFileInfo(name);
      this.getUsersList(name);

  }


  //Function to get user's folders
  getFolders(){
    //Call function getTeacherFolder() of FolderService
    this.folderService.getTeacherFolder().subscribe(data=>{ 
      this.folders=data.folders;
    })
  }



  //Function to get folder's files
  getFiles(id){
    //Call function getFolderFiles() of FolderService
    this.folderService.getFolderFiles(id).subscribe(data=>{ 
      this.files=data.files[0].files;
      console.log(data);
    })
  }

  //Function to get folder's files
  getFileInfo(name){
    //Call function getFileInfo() of FolderService
    this.folderService.getFileInfo(name).subscribe(data=>{ 
      this.fileInfos=data.file.files[0];
    })
    
  }


   //Function to get folder's files
   getUsersList(name){
    //Call function getUsersList() of FolderService
    this.folderService.getUsersList(name).subscribe(data=>{ 
      this.fileUsers=data.users.users;
    })
    
  }




  ngOnInit() {
    this.getFolders();    //get folder's on component initialization

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false
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
    ];
  }

}
