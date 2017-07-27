import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//New for File Uploader
import { FileUploader} from 'ng2-file-upload';
import { environment } from '../../environments/environment';

import {AuthServiceService} from '../service/auth-service.service';
import {PostServiceService} from '../service/post-service.service';
import {ClassService} from '../service/class.service';


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

  pointsListErrorMessage:string;
  pointsList: any;

  baseUrl = environment.apiBase;

  fileUpload = new FileUploader({
    url: this.baseUrl + '/api/posts'
  });

  saveSuccessful: string;
  saveError: string;
  logoutError: string;

  constructor(
    private authServ: AuthServiceService,
    private postServ: PostServiceService,
    private classServ: ClassService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
    .then((userFromApi)=>{
      this.currentUser = userFromApi;
      console.log(this.currentUser.team);
      this.showPosts();
      console.log(this.currentUser);
      console.log(this.pointsList);
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

//SHOW POINTS
showPoints(id){
  this.classServ.showPointsFromDb(id)
  .subscribe((pointsList)=>{
    this.pointsList = pointsList;
    console.log(pointsList);
  },
  () =>{
    this.pointsListErrorMessage = "No Points to Display, Why don't you try adding some!"
  }
 );

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
