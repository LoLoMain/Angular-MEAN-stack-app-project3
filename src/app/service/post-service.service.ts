import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//probably want to use subscribe to keep getting subscribe instead of to promise to get constant updates
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
      'http://localhost:3000/api/posts',
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
      'http://localhost:3000/api/posts',
      {
        postContent: postContent,
        postPhotoUrl: photoUrl
      },
      //send the cookies across domains
      { withCredentials: true}
    )
    //Parse the JSON
    .map(res => res.json())
  }// END RETRIEVE POSTS


}


//
