import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard as AuthGuard } from './auth-guard.guard';
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
  WishlistComponent,
  ForgetPasswordComponent,
  ProfileComponent,
  AddressComponent,
} from './public-api';
import { AuthGuardService } from './services/auth-guard.service';

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
  {
    path: 'profile/edit',
    component: EditAccountInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'newsletterswitch', component: NewsletterSwitchComponent },
  {
    path: 'profile/address/addressbook',
    component: AddressBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orderhistory',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/address/addressbook/:id',
    component: AddressBookComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
