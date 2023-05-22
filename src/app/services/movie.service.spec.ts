import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovies method with title', () => {
    const spyOnGetMovies = jest.spyOn(service, 'getMovies')

    service.getMovies('title')
    expect(spyOnGetMovies).toBeCalledWith('title')
  })
});
