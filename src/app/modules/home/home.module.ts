import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTimeDealComponent } from './main-timedeal/main-time-deal.component';
import { SharedModule } from '../shared/shared.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [MainTimeDealComponent, HomepageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot([{ path: 'home', component: HomepageComponent }]),
    SlickCarouselModule,
  ],
  exports: [MainTimeDealComponent, SlickCarouselModule],
})
export class HomeModule {}
