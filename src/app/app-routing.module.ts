import { RouterModule,Routes} from '@angular/router';
import { NgModule} from '@angular/core';
import { AuthGuard} from './guard/auth.guard';
import { NotAuthGuard} from './guard/notAuth.guard';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent} from './components/profile/profile.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ClassesComponent} from './components/classes/classes.component';
import { FileManagerComponent} from './components/file-manager/file-manager.component';
import { MailboxComponent} from './components/mailbox/mailbox.component';
import { InboxComponent} from './components/mailbox/inbox/inbox.component';
import { ComposeComponent} from './components/mailbox/compose/compose.component';
import { MailComponent} from './components/mailbox/mail/mail.component';


import { NewMailsComponent} from './components/mailbox/new-mails/new-mails.component';
import { SentMailsComponent} from './components/mailbox/sent-mails/sent-mails.component';
import { TrashMailsComponent} from './components/mailbox/trash-mails/trash-mails.component';
import { ImportantMailsComponent} from './components/mailbox/important-mails/important-mails.component';
import { HomeworkMailsComponent} from './components/mailbox/homework-mails/homework-mails.component';
import { CommunicationMailsComponent} from './components/mailbox/communication-mails/communication-mails.component';





const appRoutes: Routes = [
  {
    path: '',
    redirectTo:'dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',      //dashboard route
    component: DashboardComponent,
    canActivate: [AuthGuard],    // User must be logged in to view this route
    children:[
      {
        path: 'profile',        //user profile route
        component: ProfileComponent,
        canActivate: [AuthGuard]    // User must be logged in to view this route
      }, 
      {
        path: 'home',          //home route
        component: HomeComponent,
        canActivate: [AuthGuard] // User must be logged in to view this route
      }, 
      {
        path: 'classes',          //classes route
        component: ClassesComponent,
        canActivate: [AuthGuard] // User must be logged in to view this route
      },
      {
        path: 'filemanager',          //file manager route
        component: FileManagerComponent,
        canActivate: [AuthGuard] // User must be logged in to view this route
      },
      {
        path: 'mailbox',          //mailbox manager route
        component:MailboxComponent,
        canActivate: [AuthGuard], // User must be logged in to view this route
        children:[
          {
            path: 'inbox',          //inbox route
            component: InboxComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'compose',          //compose route
            component: ComposeComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'mail/:mailId/:previousUrl',          //mail route
            component: MailComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'new',          //New mail route
            component: NewMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'sent',          // Sent mail route
            component: SentMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'trash',          //Trash mail route
            component: TrashMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'important',          //Important mail route
            component: ImportantMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'homework',          //homework mail route
            component: HomeworkMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
          {
            path: 'communication',          //communication mail route
            component: CommunicationMailsComponent,
            canActivate: [AuthGuard] // User must be logged in to view this route
          },
        ]
      }
    ]
  }, 
  {
    path: 'login',          //login route
    component: LoginComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  }, 
  {
    path: '**',             // "Catch-All" Route
    component: DashboardComponent,
    canActivate:[AuthGuard]
  } 

];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule {}
