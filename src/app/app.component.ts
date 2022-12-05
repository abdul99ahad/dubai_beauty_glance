import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dubai_beauty_glance';

  navBarItemList: string[] = [
    'NEW',
    'BEST',
    'TIME DEAL',
    'PROMOTION',
    'BRAND',
    'COUPON',
  ];

  imageObject: Array<object> = [
    {
      image: 'assets/img/slider/1.jpg',
      thumbImage: 'assets/img/slider/1_min.jpeg',
      alt: 'alt of image',
      title: 'title of image',
    },
    {
      image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
      thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
      title: 'Image title', //Optional: You can use this key if want to show image with title
      alt: 'Image alt', //Optional: You can use this key if want to show image with alt
      order: 1, //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
    },
  ];

  bannerImagesCarousel: Array<object> = [
    {
      image: '../assets/banner_1.jpg',
      title: 'Banner 1',
    },
    {
      image: '../assets/banner_2.jpg',
      title: 'Banner 2',
    },
    {
      image: '../assets/banner_3.jpg',
      title: 'Banner 3',
    },
    {
      image: '../assets/banner_4.jpg',
      title: 'Banner 4',
    },
  ];

  eventBannerCarousel: Array<object> = [
    {
      image: '../assets/event_banner_1.jpg',
      title: 'Event Banner 1',
    },
    {
      image: '../assets/event_banner_2.jpg',
      title: 'Event banner 2',
    },
    {
      image: '../assets/event_banner_3.jpg',
      title: 'Event banner 3',
    },
  ];
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
