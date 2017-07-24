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
  likes: any[] = [];
  saveSuccessful: string;
  saveError: string;

  logoutError: string;

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
      console.log(this.currentUser);
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

console.log("before for loop" + postList.length);

      postList.forEach((post)=> {
        this.likes.push(0);
        console.log("blahhhhhhhh")
      });


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
  }// END ADD NEW POSTS

//ADD Likes
addLikes(i){
  console.log("i issssssssssss" + i);
  this.likes[i] += 1;
  console.log(this.likes[i]);
}


//LOG OUT USER
  logOut(){
    this.authServ.logout()
    .then(()=>{
      this.router.navigate(['/']);
    })
    .catch(()=>{
      this.logoutError = "Log out Failure";
    });
  }

}
