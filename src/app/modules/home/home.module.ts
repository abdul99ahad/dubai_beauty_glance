import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTimedealComponent } from './main-timedeal/main-timedeal.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [MainTimedealComponent, HomepageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([{ path: 'home', component: HomepageComponent }]),
    SlickCarouselModule,
  ],
  exports: [MainTimedealComponent, SlickCarouselModule],
})
export class HomeModule {}
