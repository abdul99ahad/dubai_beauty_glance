import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from 'src/app/interfaces/product.interface';
import {HomepageNgxCarouselsState} from './homepage-carousel.type';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {WebApiService} from '../../../../services/web-api.service';
import {map, Observable, Subscription} from 'rxjs';
import {
  Brand,
  BrandWithProducts,
} from '../../../../interfaces/brand.interface';
import {Banner} from "../../../../interfaces/banner.interface";
import {Setting} from "../../../../interfaces/setting.interface";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public displayScrollButtons: boolean = false;

  public topPosToStartShowing: number = 100;

  public currentBestBrandItem: number = 1;
  // public slider: Array<Banner>;
  public allEventAndBgMainBanner: Array<Banner> = [];

  public allEventBanner: Array<Banner> = [];
  public brandSaleImages: Array<Banner> = [];
  public deliveryBanner: Array<Banner> = [];
  public banner: Array<Banner> = [];
  response: boolean = false;

  public bestItemsOfTheMonth: Array<Product> = new Array<Product>(20).fill({
    name: 'MISSHA',
    slug: 'missha',
    price: '22,000',
    discount_price: '18,000',
    image: '../../../../../assets/product_1.jpg',
    brand: {
      name: 'Brand 025 - 0003',
      slug: 'brand-025-0003',
      country_name: 'Bolivia',
      country_code: 'bo',
      country_flag: 'countries/images/bo.svg',
      brand_image: 'images/brand.png',
      brand_banner_image: 'images/brandbanner.jpg',
    },
  });

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
      data: this.allEventBanner,
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

  public constructor(private readonly webApiService: WebApiService) {
  }

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
    this.getMainSlider()
    this.getPromotionEvent()
    this.getPromotionBrand()
    this.getDeliveryBanner();
    this.getBanner();
    this.response = true;
  }

  getMainSlider(): Subscription {
    return this.webApiService.getBanners('slider').pipe(
      map(({data}: { data: Array<Banner> }) => data),
      map((banners: Array<Banner>) =>
        banners.map((banner: Banner) => {
          banner.image = this.webApiService.imgUrl + banner.image;
          return banner;
        })
      )
    )
      .subscribe((banners: Array<Banner>) => {
        this.allEventAndBgMainBanner = banners;
      });
  }

  getPromotionEvent(): Subscription {
    return this.webApiService.getBanners('promotion_event').pipe(
      map(({data}: { data: Array<Banner> }) => data),
      map((banners: Array<Banner>) =>
        banners.map((banner: Banner) => {
          banner.image = this.webApiService.imgUrl + banner.image;
          return banner;
        })
      )
    )
      .subscribe((banners: Array<Banner>) => {
        this.allEventBanner = banners;
      });
  }

  getPromotionBrand(): Subscription {
    return this.webApiService.getBanners('promotion_brand').pipe(
      map(({data}: { data: Array<Banner> }) => data),
      map((banners: Array<Banner>) =>
        banners.map((banner: Banner) => {
          banner.image = this.webApiService.imgUrl + banner.image;
          return banner;
        })
      )
    )
      .subscribe((banners: Array<Banner>) => {
        this.brandSaleImages = banners;
      });
  }

  getDeliveryBanner(): Subscription {
    return this.webApiService.getBanners('delivery_banner').pipe(
      map(({data}: { data: Array<Banner> }) => data),
      map((banners: Array<Banner>) =>
        banners.map((banner: Banner) => {
          banner.image = this.webApiService.imgUrl + banner.image;
          return banner;
        })
      )
    )
      .subscribe((banners: Array<Banner>) => {
        this.deliveryBanner = banners;
      });
  }

  getBanner(): Subscription {
    return this.webApiService.getBanners('banner').pipe(
      map(({data}: { data: Array<Banner> }) => data),
      map((banners: Array<Banner>) =>
        banners.map((banner: Banner) => {
          banner.image = this.webApiService.imgUrl + banner.image;
          return banner;
        })
      )
    )
      .subscribe((banners: Array<Banner>) => {
        this.banner = banners;
      });
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
        map(({data}: { data: Array<Product> }) => data),
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
        map(({data}: { data: Array<Brand> }) => data),
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
                  map(({data}: { data: Array<Product> }) => data),
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
