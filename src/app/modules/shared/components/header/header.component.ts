import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { map, Subject, Subscription, switchMap, } from "rxjs";
import { Router } from "@angular/router";
import { Brand } from "../../../../interfaces/brand.interface";
import { WebApiService } from "../../../../services/web-api.service";
import { Product } from "../../../../interfaces/product.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  expandedState: boolean = false;
  mobileDisplay: boolean = false;
  navBarItemList: any = [
    {
      page: "NEW",
      url: "products"
    },
    {
      page: "BEST",
      url: "products"
    },
    {
      page: "TIME DEAL",
      url: "products"
    },
    {
      page: "PROMOTIONS",
      url: "promotions"
    },
    {
      page: "BRAND",
      url: "brands"
    },
    {
      page: "COUPON",
      url: "products"
    },
  ];

  navBarItemListMobile: any = [
    {
      page: "NEW",
      url: "products",
    },
    {
      page: "BEST",
      url: "products",
    },
    {
      page: "TIME DEAL",
      url: "products",
    },
    {
      page: "PROMOTIONS",
      url: "promotions",
    },
  ];
  recentlyViewedItems: MenuItem[];
  display: boolean = false;

  public productSearchInputStyles = {
    width: "100%",
    "border-top-style": "hidden",
    "border-right-style": "hidden",
    "border-left-style": "hidden",
    "border-bottom-style": "groove",
    "border-bottom-width": "thick",
    "border-bottom-color": "black",
    "min-width": "90%",
    height: "100%",
  };

  public productSearchMobileViewInputStyles = {
    width: "100%",
    height: "35px",
    padding: "0 0 0 20px",
    border: "0",
    "border-radius": "30px",
    background: "#ededed",
  };

  public englishAlphabets: Array<string> = [];
  public brands: Array<Brand> = [];
  public filteredBrands: Array<Brand> = [];

  public products: Array<Product> = [];
  public searchProductDebouncedSubject = new Subject<string>();
  private coldSubscriber: Subscription;

  public constructor(private readonly webApiService: WebApiService, private readonly router: Router) {
  }

  public navBarMobileListViewToggle(): void {
    if (this.expandedState) {
      this.navBarItemListMobile = this.navBarItemListMobile.slice(0, 4);
    } else {
      this.navBarItemListMobile = this.navBarItemList;
    }
    this.expandedState = !this.expandedState;
  }

  public ngOnInit(): void {
    this.recentlyViewedItems = [
      {
        label: "Item 1",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "Item 2",
        icon: "pi pi-fw pi-download",
      },
      {
        label: "Item 3",
        icon: "pi pi-fw pi-refresh",
      },
    ];

    this.setupColdSubjectForLiveProductSearching();
    this.fillEnglishAlphabets();
    this.fetchBrandsForHeader();
    this.filterBrand();
  }

  public fillEnglishAlphabets(): void {
    this.englishAlphabets = new Array(90 - 65).fill(null).map((_, index: number) => {
      return String.fromCharCode(index + 65);
    });
  }

  public fetchBrandsForHeader(): void {
    this.webApiService.getBrandsForHeader().pipe(
      map(({ data }: { data: Array<Brand> }) => data),
    ).subscribe((brands: Array<Brand>) => this.brands = brands);
  }

  public filterBrand(): void;
  public filterBrand(brandNameStartingAlphabet: string): void;
  public filterBrand(brandNameStartingAlphabet?: string): void {
    const startingAlphabet = brandNameStartingAlphabet ?? this.englishAlphabets[0];

    this.filteredBrands = this.brands.filter((brand: Brand) => brand.name.startsWith(startingAlphabet));
  }

  public searchProducts(searchString: string): void {
    this.searchProductDebouncedSubject.next(searchString);
  }

  public toggleHamBurgerMenu(): void {
    this.display = !this.display;
  }

  public navigateToProduct(product: Product): void {
    this.router.navigate([
      "/product",
      product.slug
    ]);
  }

  private setupColdSubjectForLiveProductSearching() {
    this.coldSubscriber = this.searchProductDebouncedSubject
      .pipe(
        switchMap((searchText: string) => this.webApiService.getSearchedProducts(searchText)),
        map(({ data }: { data: Array<Product> }) => data),
        map((products: Array<Product>) => products.map((product: Product) => {
          product.image = this.webApiService.imgUrl + product.image;

          return product;
        }))
      )
      .subscribe((products: Array<Product>) => (this.products = products));
  }
}
