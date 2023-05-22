import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { fireEvent, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ResumePageComponent } from '../resume-page/resume-page.component';
import { MovieMock } from '../mocks';
import { MovieServiceMock } from '../services/movie.mock.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let router: Router;
  let route: ActivatedRoute;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      providers: [
        { provide: MovieService, useClass: MovieServiceMock },
        HttpClientTestingModule,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'resume/:title/:plot',
            component: ResumePageComponent
          }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the searchMovie method, when search input changes', async () => {
    const searchInput = screen.getByTestId('movie-search-input') as HTMLInputElement
    const searchMovieSpy = jest.spyOn(component, 'searchMovie');
    const inputValue = 'Matrix';

    fireEvent.input(searchInput, { target: { value: inputValue } });

    expect(searchMovieSpy).toHaveBeenCalledWith(inputValue);
  });


  it('should show movie card when request return is not empty 1', fakeAsync(async () => {
    const mockMovieService = TestBed.inject(MovieService);
    const mockRes = { Title: 'titulo', Poster: 'url', Released: '1 jan 2000' };

    const spySeachMethod = jest.spyOn(mockMovieService, 'getMovies').mockReturnValue(of(mockRes));

    component.searchMovie('title')
    flush()
    tick()
    fixture.detectChanges();
    const movieCard = await screen.findByTestId('movie-card')

    expect(spySeachMethod).toBeCalled()
    expect(movieCard).toBeTruthy();
  }));

  it('should show movie card when request return is not empty 2', async () => {
    jest.useFakeTimers()
    const mockMovieService = TestBed.inject(MovieService);
    const mockRes = { Title: 'titulo', Poster: 'url', Released: '1 jan 2000' };

    const spySeachMethod = jest.spyOn(mockMovieService, 'getMovies').mockReturnValue(of(mockRes));

    component.searchMovie('title')
    jest.advanceTimersByTime(1500)
    jest.runAllTicks()
    jest.useRealTimers()
    fixture.detectChanges();

    const movieCard = await screen.findByTestId('movie-card')

    expect(spySeachMethod).toBeCalled()
    expect(movieCard).toBeTruthy();
  }, 1000);

  it('should show error message when movie not found', fakeAsync(async () => {
    const mockMovieService = TestBed.inject(MovieService)
    const mockRes = { Error: 'Movie not Found', Response: false }

    const spySeachMethod = jest.spyOn(mockMovieService, 'getMovies').mockReturnValue(of(mockRes));

    component.searchMovie('')
    flush()
    fixture.detectChanges()

    const errorMsgComponent = await screen.findAllByTestId('error-msg')

    expect(spySeachMethod).toBeCalled()
    expect(errorMsgComponent).toBeTruthy()
  }))

  it('should redirect to movie resume when movie card is clicked', fakeAsync(async () => {
    const mockMovieService = TestBed.inject(MovieService)
    const mockRes = new MovieMock(); // mock de resposta da api mdb

    const spySeachMethod = jest.spyOn(mockMovieService, 'getMovies').mockReturnValue(of(mockRes));
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');

    const expectedResumeMovieUrl = `/resume/${encodeURIComponent(mockRes.Title)}/${encodeURIComponent(mockRes.Plot)}`

    component.searchMovie(mockRes.Title)
    flush()
    tick()
    fixture.detectChanges()

    const movieCard = await screen.findByTestId('movie-card')
    fireEvent.click(movieCard)
    fixture.detectChanges()

    expect(navigateSpy).toBeCalled()
    expect(router.url).toEqual(expectedResumeMovieUrl)
  }));

});
