import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthServiceService {

  constructor(
    private myHttp: Http
  ) { }
  

//POST Sign Up
//an argument for each 'req.body' in the API route
signup(firstName, lastName, email, password){
  return this.myHttp
  .post(
    'http://localhost:3000/api/signup', // need to change to a variable
    {
            //express API
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
    'http://localhost:3000/api/login',
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
    'http://localhost:3000/api/logout',
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
    'http://localhost:3000/api/checklogin',
    //send the cookies across domains
    { withCredentials: true}
  )
  .toPromise()
  .then(res => res.json())
 }
}
