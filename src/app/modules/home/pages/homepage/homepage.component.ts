import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { HomepageNgxCarouselsState } from './homepage-carousel.type';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public displayScrollButtons: boolean = false;
  public topPosToStartShowing: number = 100;
  public currentBestBrandItem: number = 1;

  public prevBestBrandItem() {
    if (this.currentBestBrandItem > 0) this.currentBestBrandItem--;
  }

  public nextBestBrandItem() {
    if (this.currentBestBrandItem < this.tabHeaderItems.length)
      this.currentBestBrandItem++;
  }
  // region NGX Carousel Sliders
  public allEventAndBgMainBanner: Array<{ image: string; title: string }> = [
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

  public bestItemsOfTheMonth: Array<Product> = new Array<Product>(20).fill({
    name: 'MISSHA',
    slug: 'missha',
    price: '22,000',
    discount_price: '18,000',
    image: '../../../../../assets/product_1.jpg',
  });

  public brandSaleImages: string[] = [
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/5002ef240783c3d1f77729ef94cb7a40.jpg',
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/6be8c4cf1df24d699a7bc110e30f7579.jpg',
  ];

  // endregion

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
  public smMainBanner: Array<{ image: string; title: string }> = [
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
  public tabHeaderItems: Array<{
    brand: string;
    imgSrc: string;
    products: Array<Product>;
  }> = [
    {
      brand: 'CORSX',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/e37c12611e89014de8bd973421859578.jpg',
      products: new Array<Product>(20).fill({
        name: 'CORSX',
        slug: 'corsx',
        price: '22,000',
        discount_price: '18,000',
        image: '../../../../../assets/product_1.jpg',
      }),
    },
    {
      brand: 'MISHA',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/2c559b211f58a199a39b7603749136ce.jpg',
      products: new Array<Product>(20).fill({
        name: 'MISSHA',
        slug: 'missha',
        price: '20,000',
        discount_price: '18,000',
        image: '../../../../../assets/product_1.jpg',
      }),
    },
    {
      brand: 'ETUDE',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/183deeb0ca7d811ef8da0a46bd67d78d.jpg',
      products: new Array<Product>(20).fill({
        name: 'ETUDE',
        slug: 'etude',
        price: '18,000',
        discount_price: '16,000',
        image: '../../../../../assets/product_1.jpg',
      }),
    },
    {
      brand: 'Beauty of Jeason',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220803/c032db4033fb307edb20c17e47bb84ee.jpg',
      products: new Array<Product>(20).fill({
        name: 'Beauty of Jeason',
        slug: 'beauty-of-jeason',
        price: '16,000',
        discount_price: '14,000',
        image: '../../../../../assets/product_1.jpg',
      }),
    },
    {
      brand: 'Round Lab',
      imgSrc:
        'https://jolse.com/web/upload/NNEditor/20220208/2869271c3dec42c062db8efb9f6b77c8.jpg',
      products: new Array<Product>(20).fill({
        name: 'Round Lab',
        slug: 'round-lab',
        price: '14,000',
        discount_price: '12,000',
        image: '../../../../../assets/product_1.jpg',
      }),
    },
  ];
  public latestProductsDisplay: Array<Product> = new Array<Product>(8).fill({
    name: 'MISSHA',
    slug: 'missha',
    price: '22,000',
    discount_price: '18,000',
    image: '../../../../../assets/product_1.jpg',
  });
  public newArrivalsProductsDisplay: Array<Product> = new Array<Product>(
    5
  ).fill({
    name: 'MISSHA',
    slug: 'missha',
    price: '22,000',
    discount_price: '18,000',
    image: '../../../../../assets/product_1.jpg',
  });

  public homePageNgxCarouselsToRender = {
    EventBannerCarousel: {
      carouselName: 'EventBannerCarousel',
      data: this.allEventAndBgMainBanner,
      carouselNumOfSlidesOnBg: 3,
    },
    BestItemsCarousel: {
      carouselName: 'BestItemsCarousel',
      data: this.bestItemsOfTheMonth,
      carouselNumOfSlidesOnBg: 5,
    },
    BrandSaleCarousel: {
      carouselName: 'BrandSaleCarousel',
      data: this.brandSaleImages,
      carouselNumOfSlidesOnBg: 5,
    },
  };
  public homePageNgxCarouselsState: HomepageNgxCarouselsState = {};

  public ngOnInit(): void {
    this.initializeNgxCarousels();
  }

  @HostListener('window:scroll')
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log('[scroll]', scrollPosition);

    this.displayScrollButtons = scrollPosition >= this.topPosToStartShowing;
  }

  public scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public scrollToDown() {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  public scrollToTopSmooth() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  // region NGX Carousel Methods
  public getCarouselConfiguration(carouselName: string) {
    return this.homePageNgxCarouselsState[carouselName].configuration;
  }

  public getCarouselCurrentSlide(carouselName: string): number {
    return this.homePageNgxCarouselsState[carouselName].currentSlide;
  }

  public getCarouselTotalSlides(carouselName: string): number {
    return this.homePageNgxCarouselsState[carouselName].numOfSlides;
  }

  public getCarouselPercentageMoved(carouselName: string): number {
    return this.homePageNgxCarouselsState[carouselName].percentageOfSliderMoved;
  }

  public moveSlideForward(carouselComponent: SlickCarouselComponent): void {
    carouselComponent.slickNext();
  }

  public moveSlideBackward(carouselComponent: SlickCarouselComponent): void {
    carouselComponent.slickPrev();
  }

  public adjustSliderStateInAccordanceWithMovement(
    carouselName: string,
    currentSlide: number
  ): void {
    const numOfSlidesForThisCarousel =
      this.getCarouselTotalSlides(carouselName);
    const newCurrentSlide = currentSlide + 1;
    this.homePageNgxCarouselsState[carouselName].currentSlide =
      currentSlide + 1;
    this.homePageNgxCarouselsState[carouselName].percentageOfSliderMoved =
      (newCurrentSlide / numOfSlidesForThisCarousel) * 100;
  }

  private initializeNgxCarousels(): void {
    for (const [, carouselInitializationState] of Object.entries(
      this.homePageNgxCarouselsToRender
    )) {
      this.homePageNgxCarouselsState[carouselInitializationState.carouselName] =
        {
          configuration: this.prepareNgxCarouselConfig(
            carouselInitializationState.carouselNumOfSlidesOnBg
          ),
          data: carouselInitializationState.data,
          currentSlide: 1,
          numOfSlides: carouselInitializationState.data.length,
          percentageOfSliderMoved:
            (1 / carouselInitializationState.data.length) * 100,
        };
    }
  }

  private prepareNgxCarouselConfig(slidesToShow: number) {
    return {
      centerMode: false,
      arrows: false,
      focusOnSelect: true,
      dots: false,
      infinite: true,
      // speed: 300,
      centerPadding: '60px',
      slidesToShow,
      // autoplay: true,
      // autoplaySpeed: 3500,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            arrows: false,
            centerPadding: '40px',
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: false,
            arrows: false,
            centerPadding: '40px',
            slidesToShow: 1,
          },
        },
      ],
    };
  }

  // endregion
}
