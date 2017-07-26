import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//New for File Uploader
import { FileUploader} from 'ng2-file-upload';

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
  postId: string;

  postContent: string;
  postPhotoUrl: string;
  likes: any[] = [];

  fileUpload = new FileUploader({
    url: 'http://localhost:3000/api/posts'
  });

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
      console.log(this.currentUser.team);
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
      this.postList = postList.reverse();

      postList.forEach((post)=> {
        this.likes.push(post.likes);
      });

    },
    () =>{
      this.postListErrorMessage = "No Posts to Display, Why don't you try adding some!"
    }
   );
 } //END SHOWLIST OF POSTS


  // ADD NEW POSTS
  createPost(){
    this.fileUpload.onBuildItemForm = (item, form)=>{
      form.append('postContent', this.postContent);
    };

    this.fileUpload.onSuccessItem = (item, response) =>{
        const newPostFromApi = JSON.parse(response);
        this.postList.unshift(newPostFromApi);
        console.log(item);
        console.log(response);
        this.saveSuccessful = "Saved Successfully!"
        this.saveError = "";
    };

    this.fileUpload.onErrorItem = (item, response)=>{
      console.log(response);
      this.saveSuccessful = "";
      this.saveError = " Whoops! something went wrong! Try again.";
    };

    //initiates AJAX request
    this.fileUpload.uploadAll();

    // this.postServ.newPost(this.postContent, this.postPhotoUrl)
    // .subscribe((newPostFromApi)=>{
    //
    // },
    // (err)=>{
    //   this.saveSuccessful = "";
    //   this.saveError = " Whoops! something went wrong! Try again.";
    // }
    //)
  }// END ADD NEW POSTS

//ADD Likes
addLikes(i, id){
    this.likes[i] += 1;

  this.postServ.addLikesToPost(this.likes[i], id)
  .subscribe((postFromApi) =>{
    console.log(this.likes[i]);
  }
  )
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
