import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class ClassService {

  constructor(
    private myHttp: Http
  ) { }

  addPointsToClass(classId, teamProgress, gradesProgress, readingProgress, prepProgress){
    return this.myHttp
    .put(
      environment.apiBase + '/api/classpoints/' + classId,
      {
        teamPoints: teamProgress,
        gradePoints: gradesProgress,
        readingPoints: readingProgress,
        prepPoints: prepProgress
      },
      { withCredentials: true }
    )
    .map(res=> res.json())
  }// End add points to class

}
