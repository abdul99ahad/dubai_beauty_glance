import { Component, OnInit } from '@angular/core';
import { FooterItemList } from './footerbaritemlist.interface';
import { FooterBarSocialMediaItemList } from './footerbarsocialmedialist.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerBarItemList: FooterItemList[] = [
    {
      title: 'ARTICLE',
      url: '',
    },
    {
      title: 'REVIEW',
      url: '',
    },
    {
      title: 'FAQ',
      url: '',
    },
    {
      title: 'CONTACT',
      url: '/contact-us',
    },
    {
      title: 'NOTICE',
      url: '',
    },
    {
      title: 'AFFILAIATE',
      url: '',
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
