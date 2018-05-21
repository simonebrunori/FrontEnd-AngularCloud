import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigateByUrl('/dashboard/mailbox/inbox');

  }

}
