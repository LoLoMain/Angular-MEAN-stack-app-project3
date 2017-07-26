import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';


@Injectable()
export class AuthServiceService {

  constructor(
    private myHttp: Http
  ) { }


//POST Sign Up
//an argument for each 'req.body' in the API route
signup(title, firstName, lastName, email, password){
  return this.myHttp
  .post(
    environment.apiBase + '/api/signup', // need to change to a variable
    {
            //express API
      signupTitle: title,
      signupFirstName: firstName,
      signupLastName: lastName,
      signupEmail: email,
      signupPassword: password
    },
    //send the cookies across domains
    { withCredentials: true}
  )
  .toPromise()
  .then(res => res.json()) //success callback
}
//----------------------------------------------------------------

//POST Log In
login(email, password){
  return this.myHttp
  .post(
    environment.apiBase + '/api/login',
    {// Form Body info to send to the back end(req.body)
      loginEmail: email,
      loginPassword: password
    },
    //send the cookies across domains
    { withCredentials: true}
  )
  .toPromise()
  .then(res => res.json())
}


//POST Log Out
logout(){
  return this.myHttp
  .post(
    environment.apiBase + '/api/logout',
    {},

    //send the cookies across domains
    { withCredentials: true}
  )
  .toPromise()
  .then(res => res.json())
}
//------------------------------------------------------

//GET check login
checkLogin(){
  return this.myHttp
  .get(
    environment.apiBase + '/api/checklogin',
    //send the cookies across domains
    { withCredentials: true}
  )
  .toPromise()
  .then(res => res.json())
 }
}
