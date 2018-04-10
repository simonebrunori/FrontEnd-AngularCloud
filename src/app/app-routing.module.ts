import { RouterModule,Routes} from '@angular/router';
import { NgModule} from '@angular/core';
import { AuthGuard} from './guard/auth.guard';
import { NotAuthGuard} from './guard/notAuth.guard';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent} from './components/profile/profile.component';




const appRoutes: Routes = [{
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',      //dashboard route
    component: HomeComponent,
    canActivate: [AuthGuard]    // User must be logged in to view this route
  }, 
  {
    path: 'login',          //login route
    component: LoginComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  }, 
  {
    path: 'profile',        //user profile route
    component: ProfileComponent,
    canActivate: [AuthGuard]    // User must be logged in to view this route
  }, 
  {
    path: '**',             // "Catch-All" Route
    component: HomeComponent
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
