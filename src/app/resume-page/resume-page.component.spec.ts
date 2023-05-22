import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResumePageComponent } from './resume-page.component';
import { of } from 'rxjs';
import { screen } from '@testing-library/angular';

describe('ResumePageComponent', () => {
  let component: ResumePageComponent;
  let fixture: ComponentFixture<ResumePageComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  const activatedRouteParamRes = { title: "The Matrix Revolutions", plot: "The human city of Zion defends itself against" }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumePageComponent],
      imports: [RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(activatedRouteParamRes)
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ResumePageComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get activated route params when initialized', async () => {
    const spyOnParams = jest.spyOn(activatedRoute.params, 'subscribe');

    fixture.detectChanges();
    component.ngOnInit();

    expect(spyOnParams).toHaveBeenCalled();
  });
  
  it('should navigate to "/" when return button is clicked', () => {
    const returnBtn = screen.getByTestId('return-button')
    const navigateSpy = jest.spyOn(router, 'navigateByUrl');
    
    returnBtn.click()
    fixture.detectChanges()

    expect(navigateSpy).toBeCalled()
  })
});
