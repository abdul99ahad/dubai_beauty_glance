import {Component, Input, OnInit} from '@angular/core';
import { FooterItemList } from './footerbaritemlist.interface';
import { FooterBarSocialMediaItemList } from './footerbarsocialmedialist.interface';
import {Setting} from "../../../interfaces/setting.interface";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() setting: Setting;
  footerBarItemList: FooterItemList[] = [
    {
      title: 'AGREEMENT',
      url: '/agreement',
    },
    // {
    //   title: 'REVIEW',
    //   url: '',
    // },
    {
      title: 'FAQ',
      url: '/faq',
    },
    {
      title: 'CONTACT',
      url: '/contact-us',
    },
    {
      title: 'TESTIMONIALS',
      url: '/testimonials',
    },
    {
      title: 'PRIVACY POLICY',
      url: '/privacy-policy',
    },
    {
      title: 'ABOUT US',
      url: '/about-us',
    },
  ];

  footerBarSocialMediaItemList: FooterBarSocialMediaItemList[] = [
    {
      title: 'FACEBOOK',
      url: '',
      class: 'fb',
    },
    {
      title: 'INSTAGRAM',
      url: '',
      class: 'insta',
    },
    {
      title: 'YOUTUBE',
      url: '',
      class: 'ytb',
    },
  ];

  footerPaymentLinks: string[] = [
    '../../../../assets/footer_pg_logo1.png',
    '../../../../assets/footer_pg_logo2.png',
    '../../../../assets/footer_pg_logo3.png',
    '../../../../assets/footer_pg_logo4.png',
    '../../../../assets/footer_pg_logo5.png',
  ];

  footerAppDownloadLinks: string[] = [
    '../../../../assets/app_down_btn1.png',
    '../../../../assets/app_down_btn2.png',
  ];
  constructor() {}

  ngOnInit(): void {}
}
