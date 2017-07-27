import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthServiceService} from '../service/auth-service.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  currentUser: any = {};

  constructor(
    private authServ: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authServ.checkLogin()
    .then((userFromApi)=>{
      this.currentUser = userFromApi;
      console.log(this.currentUser);
      // this.pointsList = this.currentUser.team.teamPoints;
    })
    .catch((err)=>{
      this.router.navigate(['/'])
    })
  }

}
