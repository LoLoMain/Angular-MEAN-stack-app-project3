import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  teamProgress: any = 10;

  constructor() { }

  ngOnInit() {
  }

  addTeamPoints(){
    this.teamProgress +=10;

  }

}
