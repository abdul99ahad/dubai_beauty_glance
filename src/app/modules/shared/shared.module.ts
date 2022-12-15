import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';

// Components
import { InputTextboxComponent } from './input-textbox/input-textbox.component';
import { InputButtonComponent } from './input-button/input-button.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { BrandsaleCardComponent } from './brandsale-card/brandsale-card.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { FormsModule } from '@angular/forms';

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
    InputNumberModule,
    FormsModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CarouselModule,
    DividerModule,
    DataViewModule,
    InputTextboxComponent,
    InputButtonComponent,
    FooterComponent,
    ProductCardComponent,
    BrandsaleCardComponent,
    CountdownTimerComponent,
    AdBannerComponent,
    CartListComponent,
  ],
})
export class SharedModule {}
