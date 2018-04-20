import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  folders;
  user;
  files;

  constructor(private folderService:FolderService) {
    
   }

  //JQuery sidebar event
  toggleSidebar(){
      $('.right-sidebar').addClass('open');
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
    })
  }


  ngOnInit() {
    this.getFolders();    //get folder's on component initialization
    
  }

}
