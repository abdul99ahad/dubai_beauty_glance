import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextboxComponent } from './input-textbox/input-textbox.component';
import { InputButtonComponent } from './input-button/input-button.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { BrandsaleCardComponent } from './brandsale-card/brandsale-card.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';

@NgModule({
  declarations: [
    InputTextboxComponent,
    InputButtonComponent,
    FooterComponent,
    ProductCardComponent,
    BrandsaleCardComponent,
    CountdownTimerComponent,
    AdBannerComponent,
  ],
  imports: [CommonModule, InputTextModule, ButtonModule, CarouselModule],
  exports: [
    InputTextModule,
    ButtonModule,
    InputTextboxComponent,
    InputButtonComponent,
    FooterComponent,
    ProductCardComponent,
    BrandsaleCardComponent,
    CountdownTimerComponent,
    AdBannerComponent,
    CarouselModule,
    DividerModule,
  ],
})
export class SharedModule {}
