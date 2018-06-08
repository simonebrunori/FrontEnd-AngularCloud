import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare var $;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  users;


  constructor(private authService:AuthService) { 
    this.authService.getAllUsersWhithMe().subscribe(data=>{
      this.users=data.users;
      console.log(data.users);
    });

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

  ngOnInit() {
  }

}
