import { Component, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import {AuthService} from '../../services/auth.service';
import {InitService} from '../../services/init.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {saveAs} from 'file-saver';
import { ToastrService } from 'ngx-toastr';

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
  folderPath;
  canGoBack;
  folderName="";
  form;
  username;
  parentID;

  selectedElements=[];
  check;

  message;
  previousID;
  previousTID;


  constructor(private folderService:FolderService, private formBuilder:FormBuilder, private authService:AuthService,private toastr: ToastrService) {
    this.createFolderForm();
   }

   


   //Function to create Folder form for folder name
   createFolderForm(){
    this.form=this.formBuilder.group({
      fName: [''],   //Folder name
    });
   }
   

  //JQuery sidebar event
  toggleSidebar(name,id){
    console.log(id);
      $(this.previousID).removeClass('active');
      $('#'+id).addClass('active');
      $('.right-sidebar').addClass('open');
      this.previousID='#'+id;
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
  getFolderContent(id,Tf){
    
    this.parentID=id; 
    this.addActiveClass(id,Tf);
    //Call getChildrenFolders() to get all the children folders
    this.getChildrenFolders(id);
    setTimeout
    this.getFolderPath(id);
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
      // console.log(data);
      //Call the function getFiles() to get the files
      this.getFiles(parent);
    })
  }

  //Function to get all files of the folders
  getFiles(parent){
    //Call function getFolderFiles() of FolderService
    this.folderService.getFolderFiles(parent).subscribe(data=>{ 
    this.files=data.files[0].files;
    // console.log(data);
    })

  }


  addActiveClass(id, Tf){

    if(Tf==='T'){
      var selector="#"+id+Tf;
      $(this.previousTID).removeClass('active');
      $(selector).addClass('active');
      this.previousTID=selector;
    }
      
  }

  //Function to get the folder path
  getFolderPath(id){
    this.folderService.getFolderPath(id).subscribe(data=>{ 
      this.folderPath=data.path.folderPath;
      this.checkIfCanGoBack();
    })
  }

  goBack(){
    var s=this.folderPath.split('/');
    this.getFolderChildrenByName(s[s.length-3]);
    
  }


  //Function to get folder's file by name
  getFolderFileByName(name){
      //Call function getFolderFileByName() of FolderService
      this.folderService.getFolderFileByName(name).subscribe(data=>{ 
      this.files=data.files[0].files;
      this.getFolderPathByName(name);
      })

  }


  //Function to get folder's folders by name
  getFolderChildrenByName(name){
    //Call function getFolderChildrenByName() of FolderService
    this.folderService.getFolderChildrenByName(name).subscribe(data=>{ 
      this.childrenFolders=data.folders;
      });
      this.getFolderFileByName(name);
  }

  //Function to get folder's path by name
  getFolderPathByName(name){
     //Call function getFolderPathByName() of FolderService
     this.folderService.getFolderPathByName(name).subscribe(data=>{ 
      this.folderPath=data.path.folderPath;
      this.checkIfCanGoBack();
      });
  }


  //Function to enable/disable Back button
  checkIfCanGoBack(){
    var s=this.folderPath.split('/');
    //Check if it is possible to go back
    if(s[s.length-3]==''){
      this.canGoBack=false;
    }else{
      this.canGoBack=true;
    }
  }


  //Function to get parent folder
  getParentFolderName(){
    var p=this.folderPath.split('/');
    return p[p.length-2];
  }




  //Function to create folder 
  createNewFolder(){
    //Create folder object
    const folder= {
      name: this.form.get('fName').value,   //get value from form
      createdBy: this.username,   //username
      parent: this.parentID,    //parent folder
      path: this.folderPath,    //path  
      parentName: this.getParentFolderName()    //get parent folder name
    }

    console.log(folder);

    this.folderService.postFolder(folder).subscribe(data=>{

      // this.form.controls['fName'].setValue(null);
      $('#folderModal').modal('toggle');

      this.form.reset();


      if(!data.success){
        this.toastr.error('Error!', data.message,{timeOut: 3000, closeButton:true});
      }else{
        this.toastr.success('Success!', data.message ,{timeOut: 3000, closeButton:true});


        this.getFolderContent(this.parentID,'');
      }
    })

  }


//Function for file download
downloadFile(filename){
    this.folderService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
}


//function to add elements from the array of selected items
addElementToDel(id){

  this.selectedElements.push(id);
  console.log(this.selectedElements);

}


//function to remove elements from the array of selected items
removeElementToDel(id){
  const index = this.selectedElements.indexOf(id);
  this.selectedElements.splice(index, 1);
  console.log(this.selectedElements);
}

//Function to remove checked from elements
deselectElements(){
  $('.icheckbox_square-green').removeClass('checked');
  this.selectedElements=[];
}

//Function to delete elements
delete(){
  this.selectedElements.forEach(element => {
    this.folderService.deleteElement(element).subscribe(data=>{
      if(!data.success){    //if return error
        this.toastr.error('Error!', data.message,{timeOut: 3000, closeButton:true});
      }else{    //if return success
        this.toastr.success('Success!', data.message ,{timeOut: 3000, closeButton:true});      
      }
      this.getFolderContent(this.parentID,'');  //reload elements on the screen
    })   
    this.deselectElements();  //deselect checked elements
    $('#smallModal').modal('toggle');
  });

  
}











//Function to get files from child component (file-upload)
  public handleEvent(files){
    this.files = files;
    console.log(files);
  }

  ngAfterViewInit() {
    InitService.rightInit();
    InitService.initCommon();
    this.getFolders();    //get folder's on component initialization
  }

  ngOnInit(){

    
      // Get profile username on page load
      this.authService.getProfile().subscribe(profile => {
       this.username = profile.user.username; // Used when creating new elements
      });
  }

}
