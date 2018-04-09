import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent} from './components/home/home.component';




const appRoutes: Routes = [
    { path:'', component: HomeComponent },
    { path:'dashboard', component: HomeComponent},
    { path:'login', component: LoginComponent},
    { path: '**', component: HomeComponent }    // "Catch-All" Route

];



@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }
