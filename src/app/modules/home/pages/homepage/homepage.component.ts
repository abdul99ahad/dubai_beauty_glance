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

  slideConfig = {
    // slidesToShow: 3,
    // slidesToScroll: 3,
    centerMode: true,
    arrows: false,
    focusOnSelect: true,
    // dots: true,
    // infinite: true,
    // speed: 300,
    // adaptiveHeight: true,
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       arrows: false,
    //       centerMode: true,
    //       centerPadding: '40px',
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       arrows: false,
    //       centerMode: true,
    //       centerPadding: '40px',
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  addSlide() {
    //this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    //this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

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
  eventBannerCarousel: Array<{ image: string; title: string }> = [
    {
      image: '../../../../../assets/slider_banner_1.jpg',
      title: 'Event Banner 1',
    },
    {
      image: '../../../../../assets/slider_banner_2.jpg',
      title: 'Event banner 2',
    },
    {
      image: '../../../../../assets/slider_banner_3.jpg',
      title: 'Event banner 3',
    },
    {
      image: '../../../../../assets/slider_banner_4.jpg',
      title: 'Event Banner 1',
    },
    {
      image: '../../../../../assets/slider_banner_5.jpg',
      title: 'Event banner 2',
    },
  ];
  tabHeaderItems: Array<{ brand: string; imgSrc: string }> = [
    {
      brand: 'CORSX',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/e37c12611e89014de8bd973421859578.jpg',
    },
    {
      brand: 'MISHA',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/2c559b211f58a199a39b7603749136ce.jpg',
    },
    {
      brand: 'ETUDE',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/183deeb0ca7d811ef8da0a46bd67d78d.jpg',
    },
    {
      brand: 'Beauty of Jeason',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220803/c032db4033fb307edb20c17e47bb84ee.jpg',
    },
    {
      brand: 'Round Lab',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/2869271c3dec42c062db8efb9f6b77c8.jpg',
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
