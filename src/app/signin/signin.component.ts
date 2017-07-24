import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceService } from '../service/auth-service.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  //Sign Up variables
  titleValue: string;
  firstNameValue: string;
  lastNameValue: string;
  emailValue: string;
  passwordValue: string;
  errorMessage: string;

  //Log In Variables
  loginEmail: string;
  loginPassword: string;
  loginErrorMessage: string;

  constructor(
    private authServ: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
  //if success, we are logged in.
  .then((resultFromApi)=>{
    this.router.navigate(['/dashboard']);
  })
  }

//Sign Up with signin.component.html and AuthServiceService
  formSignUp() {
                   // Service Function: parameters are from Ng Model in
    this.authServ.signup(this.titleValue, this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
    .then((resultFromApi)=> {
      console.log(resultFromApi);
      //Clear Form
      this.titleValue = "";
      this.firstNameValue = "";
      this.lastNameValue = "";
      this.emailValue = "";
      this.passwordValue = "";
      //Clear Error Message
      this.errorMessage = "";

      //redirect automatically when sign up successful
     this.router.navigate(['/dashboard']);

    })
    .catch((err)=>{
      console.log(err);
      const parsedError = err.json();
      this.errorMessage = parsedError.message;
    });
  }
  //-------------------------------------------------------------


//LOG IN with signin.component.html and AuthServiceService
  formLogIn(){
    this.authServ.login(this.loginEmail, this.loginPassword)
    .then((resultFromApi)=>{
      console.log(resultFromApi);
      //Clear Form
      this.loginEmail = "";
      this.loginPassword = "";
      //Clear Login Error Message
      this.loginErrorMessage = "";

      //redirect automatically when sign up successful
      this.router.navigate(['/dashboard']);

    })
    .catch((err)=>{
      console.log(err);
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message;
    });
  }

}
