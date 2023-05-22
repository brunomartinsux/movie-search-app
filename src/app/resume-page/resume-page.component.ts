import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit {

  movieData: any

  constructor(private _activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((routeParams) => {
      this.movieData = routeParams
    })
  }

}
