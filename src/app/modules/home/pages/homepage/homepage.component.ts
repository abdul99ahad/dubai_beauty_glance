import { Component } from '@angular/core';
import { Product } from "../../../../interfaces/product.interface";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  public brandSaleImages: string[] = [
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
  ];

  public responsiveOptions = [
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

  public slideConfig = {
    // slidesToShow: 3,
    // slidesToScroll: 3,
    centerMode: true,
    arrows: false,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    speed: 300,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3500,
    // dots: true,
    // infinite: true,
    // speed: 300,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };

  public bestItemsCarouselConfig = {
    // slidesToShow: 3,
    // slidesToScroll: 3,
    arrows: false,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    speed: 300,
    centerPadding: '60px',
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 3500,
    // dots: true,
    // infinite: true,
    // speed: 300,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
    ],
  };

  public eventBannerCarouselMobile: Array<{ image: string; title: string }> = [
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

  public eventBannerCarousel: Array<{ image: string; title: string }> = [
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

  public tabHeaderItems: Array<{ brand: string; imgSrc: string }> = [
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

  public productsDisplay: Array<Product> = new Array<Product>(20).fill(
    {
      name: 'MISSHA',
      slug: 'missha',
      price: '22,000',
      discount_price: '18,000',
      image: '../../../../../assets/product_1.jpg',
    },
 );

  public latestProductsDisplay: Array<Product> = new Array<Product>(20).fill(
    {
      name: 'MISSHA',
      slug: 'missha',
      price: '22,000',
      discount_price: '18,000',
      image: '../../../../../assets/product_1.jpg',
    },
  );

  public newArrivalsProductsDisplay: Array<Product> = new Array<Product>(5).fill(
    {
      name: 'MISSHA',
      slug: 'missha',
      price: '22,000',
      discount_price: '18,000',
      image: '../../../../../assets/product_1.jpg',
    },
  );
}
