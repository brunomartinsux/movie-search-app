import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResumePageComponent } from './resume-page/resume-page.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'resume/:title/:plot',
    component: ResumePageComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResumePageComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
