import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { FormsModule } from '@angular/forms';

import { CarouselModule } from 'primeng/carousel';
import { HomeModule } from './modules/home/home.module';
import { QuickMenuComponent } from './modules/home/quick-menu/quick-menu.component';
import { SharedModule } from './modules/shared/shared.module';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AgreementComponent } from './pages/agreement/agreement.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductsListingComponent } from './pages/products-listing/products-listing.component';
import { PromotionsListingComponent } from './pages/promotions-listing/promotions-listing.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WebApiService } from './services/web-api.service';
import { BrandsListingComponent } from './pages/brand-listing/brand-listing.component';
import { BrandProductListingComponent } from './pages/brand-products-listing/brand-products-listing.component';
import { CategoryProductsListingComponent } from './pages/category-products-listing/category-products-listing.component';
import { DecodeHtmlEntitiesPipe } from './pipes/decode-html-entities.pipe';
import { TagProductsListingComponent } from './pages/tag-products-listing/tag-products-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickMenuComponent,
    ContactUsComponent,
    AboutUsComponent,
    TestimonialComponent,
    PrivacyPolicyComponent,
    AgreementComponent,
    FaqComponent,
    ProductsListingComponent,
    PromotionsListingComponent,
    ProductComponent,
    CartComponent,
    SignUpComponent,
    CheckoutComponent,
    BrandsListingComponent,
    BrandProductListingComponent,
    CategoryProductsListingComponent,
    TagProductsListingComponent,
    DecodeHtmlEntitiesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    HomeModule,
    SharedModule,
    CarouselModule,
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
