import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthServiceService} from '../service/auth-service.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  currentUser: any = {};

  teamProgress: any = 1;
  gradesProgress: any = 1;
  prepProgress: any = 1;
  readProgress: any = 1;

  teamTotal: any;
  constructor(
    private authServ: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
    .then((userFromApi)=>{
      this.currentUser = userFromApi;
      console.log(this.currentUser.class);
    })
    .catch((err)=>{
      this.router.navigate(['/'])
    })
  }

  addTeamPoints(){
    this.teamProgress +=5;
    this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;
  }
  addGradePoints(){
    this.gradesProgress +=5;
    this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;

  }
  addPrepPoints(){
    this.prepProgress +=5;
    this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;

  }
  addReadPoints(){
    this.readProgress +=5;
    this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;

  }

}
