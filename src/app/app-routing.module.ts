import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  HomepageComponent,
  ContactUsComponent,
  AboutUsComponent,
  TestimonialComponent,
  PrivacyPolicyComponent,
  AgreementComponent,
  FaqComponent,
  ProductComponent,
  CartComponent,
} from './exports';
import { ProductsListingComponent } from './pages/products-listing/products-listing.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'testimonials', component: TestimonialComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'agreement', component: AgreementComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'products', component: ProductsListingComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
