import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  folders;
  user;

  constructor(private folderService:FolderService) { }

  //Function to get user's folders
  getFolders(){
    //Call function getTeacherFolder() of FolderService
    this.folderService.getTeacherFolder().subscribe(data=>{ 
      this.folders=data.folders;
    })
  }

  ngOnInit() {
    this.getFolders();    //get folder's on component initialization
  }

}
