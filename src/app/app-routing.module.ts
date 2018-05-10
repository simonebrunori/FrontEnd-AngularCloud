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
            path: 'mail',          //mail route
            component: MailComponent,
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
