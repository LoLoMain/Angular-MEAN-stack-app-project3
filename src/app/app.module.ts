import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { HttpModule, Response } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
//handles File Upload - Different direcive for Drag and Drop
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { ClassesComponent } from './classes/classes.component';

//import Services and add to providers below
import {AuthServiceService} from './service/auth-service.service';
import {PostServiceService} from './service/post-service.service';
import {ClassService} from './service/class.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SigninComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
  ],
  providers: [
    AuthServiceService,
    PostServiceService,
    ClassService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
