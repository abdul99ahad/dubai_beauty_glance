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
import { DataViewModule } from 'primeng/dataview';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    InputTextboxComponent,
    InputButtonComponent,
    FooterComponent,
    ProductCardComponent,
    BrandsaleCardComponent,
    CountdownTimerComponent,
    AdBannerComponent,
    CartListComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    DataViewModule,
    TableModule,
  ],
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
    DataViewModule,
    CartListComponent,
  ],
})
export class SharedModule {}
