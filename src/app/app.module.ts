import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { HttpModule, Response } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostListsComponent } from './post-lists/post-lists.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';

//import Services and add to providers below
import {AuthServiceService} from './service/auth-service.service';
import {PostServiceService} from './service/post-service.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListsComponent,
    HomeComponent,
    DashboardComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthServiceService,
    PostServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
