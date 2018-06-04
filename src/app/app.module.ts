import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Select2Module } from 'ng2-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {ModalModule} from "ngx-modal";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { HttpClientModule} from '@angular/common/http';
import { ICheckModule } from 'ng4-icheck';
import { EditorModule } from '@tinymce/tinymce-angular';







import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { ClassService } from './services/class.service';
import { FolderService} from './services/folder.service';
import { MailService} from './services/mail.service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MailboxComponent } from './components/mailbox/mailbox.component';
import { MailComponent } from './components/mailbox/mail/mail.component';
import { MailSidebarComponent } from './components/mailbox/mail-sidebar/mail-sidebar.component';
import { InboxComponent } from './components/mailbox/inbox/inbox.component';
import { ComposeComponent } from './components/mailbox/compose/compose.component';
import { TrashMailsComponent } from './components/mailbox/trash-mails/trash-mails.component';
import { HomeworkMailsComponent } from './components/mailbox/homework-mails/homework-mails.component';
import { ImportantMailsComponent } from './components/mailbox/important-mails/important-mails.component';
import { CommunicationMailsComponent } from './components/mailbox/communication-mails/communication-mails.component';
import { SentMailsComponent } from './components/mailbox/sent-mails/sent-mails.component';
import { NewMailsComponent } from './components/mailbox/new-mails/new-mails.component';
import { TodoComponent } from './components/todo/todo.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    DashboardComponent,
    ClassesComponent,
    FileManagerComponent,
    FileUploadComponent,
    FileSelectDirective,
    MailboxComponent,
    MailComponent,
    MailSidebarComponent,
    InboxComponent,
    ComposeComponent,
    TrashMailsComponent,
    HomeworkMailsComponent,
    ImportantMailsComponent,
    CommunicationMailsComponent,
    SentMailsComponent,
    NewMailsComponent,
    TodoComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    Select2Module,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule,
    HttpClientModule,
    ICheckModule.forRoot(),
    EditorModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, ClassService, FolderService, MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
