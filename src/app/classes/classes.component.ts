import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthServiceService} from '../service/auth-service.service';
import {ClassService} from '../service/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  currentUser: any = {};
  studentList: object[];

  teamProgress: any = 0;
  gradesProgress: any = 0;
  prepProgress: any = 0;
  readProgress: any = 0;

  teamTotal: any =0;
  constructor(
    private authServ: AuthServiceService,
    private classServ: ClassService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
    .then((userFromApi)=>{
      this.currentUser = userFromApi;
      console.log(this.currentUser.team);

      this.teamProgress = this.currentUser.class.teamworkPoints;
      this.gradesProgress= this.currentUser.class.gradePoints;
      this.prepProgress = this.currentUser.class.prepPoints;
      this.readProgress= this.currentUser.class.readingPoints;

      this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;
      this.studentList = this.currentUser.class.students;
      console.log(this.teamTotal);
    })
    .catch((err)=>{
      this.router.navigate(['/'])
    })
  }

//Refactor these functions (see comments below - come back)
  addTeamPoints(id){
    this.teamProgress +=5;

    this.classServ.addPointsToClass(id, this.teamProgress, this.gradesProgress, this.readProgress, this.prepProgress)
      .subscribe((classFromApi)=>{
       console.log( `${this.currentUser.lastName}class has ${this.teamProgress}  teamwork points!`);
      })
  }

  addGradePoints(id){
    this.gradesProgress +=5;

    this.classServ.addPointsToClass(id, this.teamProgress, this.gradesProgress, this.readProgress, this.prepProgress)
      .subscribe((classFromApi)=>{
       console.log( `${this.currentUser.lastName}class has ${this.gradesProgress}  GRADES points!`);
      })
  }

  addPrepPoints(id){
    this.prepProgress +=5;

    this.classServ.addPointsToClass(id, this.teamProgress, this.gradesProgress, this.readProgress, this.prepProgress)
      .subscribe((classFromApi)=>{
       console.log( `${this.currentUser.lastName}class has ${this.prepProgress}  PREP points!`);
      })
  }

  addReadPoints(id){
    this.readProgress +=5;

    this.classServ.addPointsToClass(id, this.teamProgress, this.gradesProgress, this.readProgress, this.prepProgress)
      .subscribe((classFromApi)=>{
       console.log( `${this.currentUser.lastName}class has ${this.readProgress}  READING points!`);
      })
  }

}


// sumPoints(){
//   this.teamTotal = this.teamProgress + this.gradesProgress + this.prepProgress + this.readProgress;
// }
//
// addTeamPoints(){
//   this.teamProgress +=5;
//   sumPoints();
// }
//
// addGradePoints(){
//   this.gradesProgress +=5;
//   sumPoints();
// }
// addPrepPoints(){
//   this.prepProgress +=5;
//   sumPoints();
//
// }
// addReadPoints(){
//   this.readProgress +=5;
//   sumPoints();
// }
