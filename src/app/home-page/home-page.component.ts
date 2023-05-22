import { Debounce } from '../decorators/debounce.decorator';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _movieService: MovieService) { }

  foundMovie: any
  errorMsg: boolean = false

  debouncer: any

  ngOnInit(): void {
  }

  @Debounce(1500)
  searchMovie(title: string) {
    this._movieService.getMovies(title).subscribe((res: any) => {
      if (!res?.Error) {
        this.foundMovie = res
        this.errorMsg = false
      } else {
        this.errorMsg = true
        this.foundMovie = null
      }
    })
  }

}
