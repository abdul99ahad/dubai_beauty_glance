import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';

import { CarouselModule } from 'primeng/carousel';
import { HomeModule } from './modules/home/home.module';
import { QuickMenuComponent } from './modules/home/quick-menu/quick-menu.component';
import { SharedModule } from './modules/shared/shared.module';
import { HomepageComponent } from './modules/home/pages/homepage/homepage.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AgreementComponent } from './pages/agreement/agreement.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductsListingComponent } from './pages/products-listing/products-listing.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    SharedModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
