import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsListingComponent } from './pages/brand-listing/brand-listing.component';
import { BrandProductListingComponent } from './pages/brand-products-listing/brand-products-listing.component';
import { CategoryProductsListingComponent } from './pages/category-products-listing/category-products-listing.component';
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
  SignUpComponent,
  ProductsListingComponent,
  CheckoutComponent,
  PromotionsListingComponent,
  TagProductsListingComponent,
  EditAccountInformationComponent,
  ChangePasswordComponent,
  NewsletterSwitchComponent,
  AddressBookComponent,
  OrderHistoryComponent,
} from './public-api';

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
  { path: 'product/:slug', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'promotions', component: PromotionsListingComponent },
  { path: 'brands', component: BrandsListingComponent },
  { path: 'brand/:slug', component: BrandProductListingComponent },
  { path: 'category/:slug', component: CategoryProductsListingComponent },
  { path: 'tag/:slug', component: TagProductsListingComponent },
  { path: 'edit', component: EditAccountInformationComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'newsletterswitch', component: NewsletterSwitchComponent },
  { path: 'addressbook', component: AddressBookComponent },
  { path: 'orderhistory', component: OrderHistoryComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
