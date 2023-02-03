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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
// Third Party Modules
import { NgMarqueeModule } from 'ng-marquee';

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
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { RouterModule } from '@angular/router';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { HeaderComponent } from './components/header/header.component';
import { BrandCardComponent } from './brand-card/brand-card.component';

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
    SimpleButtonComponent,
    MarqueeComponent,
    HamburgerMenuComponent,
    ProductDescriptionComponent,
    HeaderComponent,
    BrandCardComponent,
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
    RouterModule,
    NgMarqueeModule,
    ToggleButtonModule,
    SidebarModule,
    DialogModule,
    DividerModule,
    MenuModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CarouselModule,
    DividerModule,
    DataViewModule,
    InputNumberModule,
    NgMarqueeModule,
    ToggleButtonModule,
    SidebarModule,
    DialogModule,
    MenuModule,
    InputTextboxComponent,
    InputButtonComponent,
    FooterComponent,
    ProductCardComponent,
    BrandsaleCardComponent,
    CountdownTimerComponent,
    AdBannerComponent,
    CartListComponent,
    MarqueeComponent,
    HamburgerMenuComponent,
    ProductDescriptionComponent,
    HeaderComponent,
    BrandCardComponent,
  ],
})
export class SharedModule {}
