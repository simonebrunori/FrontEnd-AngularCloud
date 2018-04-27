import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import {InitService} from '../../services/init.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements AfterViewInit, OnInit {

  folders;
  user;
  files;
  fileInfos="";
  fileUsers="";
  childrenFolders="";
  path;

  constructor(private folderService:FolderService) {
    
   }

  //JQuery sidebar event
  toggleSidebar(name){
      $('#'+name).addClass('active');
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



  //Function to get folder's content (files and folders)
  getFolderContent(id){
    
    this.addActiveClass(id);
    //Call getChildrenFolders() to get all the children folders
    this.getChildrenFolders(id);
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

  //Function to get children folders
  getChildrenFolders(parent){
    //Call the service to get all children folders
    this.folderService.getChildrenFolders(parent).subscribe(data=>{
      this.childrenFolders=data.folders;
      console.log(data);
      //Call the function getFiles() to get the files
      this.getFiles(parent);
    })
  }

  //Function to get all files of the folders
  getFiles(parent){
    //Call function getFolderFiles() of FolderService
    this.folderService.getFolderFiles(parent).subscribe(data=>{ 
    this.files=data.files[0].files;
    console.log(data);
    })

  }


  addActiveClass(id){
    var selector="#"+id;
    $('.file-box').removeClass('active');
    $(selector).addClass('active');
  }




  ngAfterViewInit() {
    InitService.rightInit();
    InitService.initCommon();
    this.getFolders();    //get folder's on component initialization


    
  }

  ngOnInit(){
    this.path="/";
  }

}
