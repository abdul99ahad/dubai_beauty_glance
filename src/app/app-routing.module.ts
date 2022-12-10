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
} from './exports';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
