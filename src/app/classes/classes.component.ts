import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  teamProgress: any = 1;
  gradesProgress: any = 1;
  prepProgress: any = 1;
  readProgress: any = 1;

  teamTotal: any;
  constructor() { }

  ngOnInit() {
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
