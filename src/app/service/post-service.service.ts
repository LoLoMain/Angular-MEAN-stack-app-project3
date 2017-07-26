import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

//Use subscribe to keep getting subscribe instead of to promise to get constant updates
// either that or create a set interval


@Injectable()
export class PostServiceService {

  constructor(
    private myHttp: Http
  ) { }

  //RETRIEVE POSTS
  retrievePosts() {
    return this.myHttp
    .get(
      environment.apiBase + '/api/posts',
      //send the cookies across domains
      { withCredentials: true}
    )
    //Parse the JSON
    .map(res => res.json())
  }// END RETRIEVE POSTS

  //SAVE NEW POSTS
   newPost(postContent,photoUrl) {
    return this.myHttp
    .post(
      environment.apiBase + '/api/posts',
      {
        postContent: postContent,
      },
      //send the cookies across domains
      { withCredentials: true}
    )
    //Parse the JSON
    .map(res => res.json())
  }// END RETRIEVE POSTS

   // NEWLY ADDED
  //ADD LIKES TO POST AND SAVE
   addLikesToPost(postlikes, postid) {
    return this.myHttp
    .patch(
      environment.apiBase + '/api/updatepost/' + postid,
      {
        likes: postlikes
      },
      //send the cookies across domains
      { withCredentials: true}
    )
    //Parse the JSON
    .map(res => res.json())
  }// END ADD LIKES TO POST


}


//
