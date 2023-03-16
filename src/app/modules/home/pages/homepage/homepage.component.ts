import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { HomepageNgxCarouselsState } from './homepage-carousel.type';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { WebApiService } from '../../../../services/web-api.service';
import { map, Observable } from 'rxjs';
import {
  Brand,
  BrandWithProducts,
} from '../../../../interfaces/brand.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public displayScrollButtons: boolean = false;

  public topPosToStartShowing: number = 100;

  public currentBestBrandItem: number = 1;

  public allEventAndBgMainBanner: Array<{ image: string; title: string }> = [
    {
      image: './assets/1promotion_banner730x350.jpg',
      title: 'Event Banner 1',
    },
    {
      image: './assets/2promotion_banner730x350.jpg',
      title: 'Event banner 2',
    },
    {
      image: './assets/3promotion_banner730x350.jpg',
      title: 'Event banner 3',
    },
    {
      image: './assets/4promotion_banner730x350.jpg',
      title: 'Event Banner 1',
    },
    {
      image: './assets/5promotion_banner730x350.jpg',
      title: 'Event banner 2',
    },
  ];

  public allEventBanner: Array<{ image: string; title: string }> = [
    {
      image: '../../../../../assets/event/1.jpg',
      title: 'Event Banner 1',
    },
    {
      image: '../../../../../assets/event/2.jpg',
      title: 'Event banner 2',
    },
    {
      image: '../../../../../assets/event/3.jpg',
      title: 'Event banner 3',
    },
    {
      image: '../../../../../assets/event/4.jpg',
      title: 'Event Banner 1',
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

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
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

  public brandTabHeaders: Array<BrandWithProducts> = [];

  public newArrivalsProductsDisplay: Array<Product> = [];

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

  public constructor(private readonly webApiService: WebApiService) {}

  public prevBestBrandItem(): void {
    if (this.currentBestBrandItem === 1) {
      this.currentBestBrandItem = this.brandTabHeaders.length;
      return;
    }

    this.currentBestBrandItem--;
  }

  public nextBestBrandItem(): void {
    if (this.currentBestBrandItem === this.brandTabHeaders.length) {
      this.currentBestBrandItem = 1;
      return;
    }

    this.currentBestBrandItem++;
  }

  public ngOnInit(): void {
    this.initializeNgxCarousels();

    this.fetchLatestProducts();

    this.fetchBestBrandsWithProducts();
  }

  @HostListener('window:scroll')
  public checkScroll(): void {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.displayScrollButtons = scrollPosition >= this.topPosToStartShowing;
  }

  public scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public scrollToDown(): void {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  public fetchLatestProducts(): void {
    this.webApiService
      .getLatestProducts()
      .pipe(
        map(({ data }: { data: Array<Product> }) => data),
        map((products: Array<Product>) =>
          products.map((product: Product) => {
            product.image = this.webApiService.imgUrl + product.image;

            return product;
          })
        )
      )
      .subscribe((products: Array<Product>) => {
        this.newArrivalsProductsDisplay = products;
      });
  }

  public fetchBestBrandsWithProducts(): void {
    this.webApiService
      .getBestBrands()
      .pipe(
        map(({ data }: { data: Array<Brand> }) => data),
        map((brands: Array<Brand>) =>
          brands.map((brand: Brand) => {
            brand.brand_image = this.webApiService.imgUrl + brand.brand_image;
            brand.country_flag = this.webApiService.imgUrl + brand.country_flag;

            const products$ =
              this.webApiService.getBrandProductsWithSlugForSlider(brand.slug);
            return {
              brand: {
                ...brand,
                products: [],
              },
              products$,
            };
          })
        )
      )
      .subscribe(
        (
          brandWithEmptyProducts: Array<{
            brand: BrandWithProducts;
            products$: Observable<{ data: Array<Product> }>;
          }>
        ) => {
          brandWithEmptyProducts.forEach(
            (eachBrandWithEmptyProducts: {
              brand: BrandWithProducts;
              products$: Observable<{ data: Array<Product> }>;
            }) => {
              eachBrandWithEmptyProducts.products$
                .pipe(
                  map(({ data }: { data: Array<Product> }) => data),
                  map((products: Array<Product>) => {
                    products = products.map((product: Product) => {
                      product.image = this.webApiService.imgUrl + product.image;

                      return product;
                    });

                    eachBrandWithEmptyProducts.brand.products = products;

                    return eachBrandWithEmptyProducts.brand;
                  })
                )
                .subscribe((brandWithProducts: BrandWithProducts) => {
                  this.brandTabHeaders =
                    this.brandTabHeaders.concat(brandWithProducts);
                });
            }
          );
        }
      );
  }

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
      centerMode,
      centerMode: true,
      arrows: false,
      focusOnSelect: true,
      dots: false,
      infinite: true,
      speed: 300,
      centerPadding: '60px',
      slidesToShow,
      autoplay: false,
      autoplaySpeed: 3500,
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
}
