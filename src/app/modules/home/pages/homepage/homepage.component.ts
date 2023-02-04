import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onChange($event: Event) {
    console.log($event);
  }

  brandSaleImgs: string[] = [
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1,
    },
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
      image: '../../../../../assets/banner_1.jpg',
      title: 'Banner 1',
    },
    {
      image: '../../../../../assets/banner_2.jpg',
      title: 'Banner 2',
    },
    {
      image: '../../../../../assets/banner_3.jpg',
      title: 'Banner 3',
    },
    {
      image: '../../../../../assets/banner_4.jpg',
      title: 'Banner 4',
    },
  ];

  eventBannerCarouselMobile: Array<object> = [
    {
      image:
        'https://m.jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/2f89727882823ef75ea70b15226edbc7.jpg',
      title: 'Event Banner 1',
    },
    {
      image:
        'https://m.jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/45574d8b11c54a7d4fbff11570d1d573.jpg',
      title: 'Event Banner 1',
    },
  ];
  eventBannerCarousel: Array<object> = [
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/26c736a5538e3a856b7259d112370b4b.jpg',
      title: 'Event Banner 1',
    },
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/3bfed446b01427542d26d16a5c8f5db6.jpg',
      title: 'Event banner 2',
    },
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/466fc19a2caa384db675df0011ef9502.jpg',
      title: 'Event banner 3',
    },
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/26c736a5538e3a856b7259d112370b4b.jpg',
      title: 'Event Banner 1',
    },
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/3bfed446b01427542d26d16a5c8f5db6.jpg',
      title: 'Event banner 2',
    },
    {
      image:
        'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/466fc19a2caa384db675df0011ef9502.jpg',
      title: 'Event banner 3',
    },
  ];

  productsDisplay: any = [
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    // {
    //   title: 'MISSHA',
    //   description:
    //     'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
    //   price: '22,000',
    //   discountedPrice: '18,000',
    //   imgSrc: '../../../../../assets/product_1.jpg',
    // },
  ];

  latestProductsDisplay: any = [
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../../../../../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../../../../../assets/product.jpg',
    },
  ];
}
