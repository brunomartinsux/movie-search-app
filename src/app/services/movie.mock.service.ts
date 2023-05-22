import { MovieMock } from '../mocks';

export class MovieServiceMock {

  getMovies(title?: string){
    const movieData = new MovieMock()
    return movieData
  }
}
