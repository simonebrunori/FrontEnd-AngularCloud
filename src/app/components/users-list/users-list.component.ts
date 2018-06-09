import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  users;


  constructor(private authService:AuthService, private toastr: ToastrService) { 
    this.getUsers();


    //Load table
    setTimeout(function(){
      $(function(){
        $('#userList').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
        });
      });
    },1000);
  }


  //Function to get all users
  getUsers(){
    this.authService.getAllUsersWhithMe().subscribe(data=>{
      this.users=data.users;
      console.log(data.users);
    });
  }



//Function to delete user in the db
  deleteUser(id){
    //Call delteUser service 
    this.authService.deleteUser(id).subscribe(data=>{
      if(!data.success){
        this.toastr.error( data.message ,'Error!',{timeOut: 3000, closeButton:true});      
      }else{
        this.toastr.success( data.message ,'Success!',{timeOut: 3000, closeButton:true});      
      }
      this.getUsers();  //reaload table
    })
  }

  ngOnInit() {
  }

}
