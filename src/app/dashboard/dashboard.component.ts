import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthServiceService} from '../service/auth-service.service';
import {PostServiceService} from '../service/post-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = {};

  postList: any[] =[];
  postListErrorMessage: string;

  postContent: string;
  postPhotoUrl: string;
  saveSuccessful: string;
  saveError: string;

  constructor(
    private authServ: AuthServiceService,
    private postServ: PostServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
    .then((userFromApi)=>{
      this.currentUser = userFromApi;
      this.showPosts();
    })
    .catch((err)=>{
      this.router.navigate(['/'])
    })
  }

//SHOWLIST OF POSTS
  showPosts(){
    this.postServ.retrievePosts()
    .subscribe((postList)=>{
      this.postList = postList;
    },
    () =>{
      this.postListErrorMessage = "No Posts to Display, Why don't you try adding some!"
    }
   );
 } //END SHOWLIST OF POSTS


  // ADD NEW POSTS
  createPost(){
    this.postServ.newPost(this.postContent, this.postPhotoUrl)
    .subscribe((newPostFromApi)=>{
      this.postList.unshift(newPostFromApi);
      this.saveSuccessful = "Saved Successfully!"
      this.saveError = "";

    },
    (err)=>{
      this.saveSuccessful = "";
      this.saveError = " Whoops! something went wrong! Try again.";
      // this.saveError = "Don\t be a dumb 🐫";
    }
    )

  }

}
