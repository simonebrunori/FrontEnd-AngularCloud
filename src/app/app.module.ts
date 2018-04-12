import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService} from './services/auth.service';
import {AuthGuard} from './guard/auth.guard';
import {NotAuthGuard} from './guard/notAuth.guard';

import { FlashMessagesModule} from 'angular2-flash-messages';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
