import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, Subject, Subscription, switchMap, } from "rxjs";
import { Router } from "@angular/router";
import { Brand } from "../../../../interfaces/brand.interface";
import { WebApiService } from "../../../../services/web-api.service";
import { Product } from "../../../../interfaces/product.interface";
import { CurrencyList, Currency } from "../../../../interfaces/currencies.interface";
import { BaseComponent } from "../../../../base/base.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {
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

  public selectedCurrency: Currency;
  public availableCurrencies: Array<Currency> = [];

  public englishAlphabets: Array<string> = [];
  public brands: Array<Brand> = [];
  public filteredBrands: Array<Brand> = [];

  public products: Array<Product> = [];
  public searchProductSubject = new Subject<string>();

  public constructor(private readonly webApiService: WebApiService, private readonly router: Router) {
    super();
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
    const searchSubscription = this.observeProductSearch();
    const currencySubscription = this.setupAvailableCurrencies();
    const brandSubscription = this.setupBrandsForHeader();

    this.addSubscriptions(searchSubscription, currencySubscription, brandSubscription);
  }

  public ngOnDestroy(): void {
    this.flushSubscriptions();
  }

  public filterBrand(): void;
  public filterBrand(brandNameStartingAlphabet: string): void;
  public filterBrand(brandNameStartingAlphabet?: string): void {
    const startingAlphabet = brandNameStartingAlphabet ?? this.englishAlphabets[0];

    this.filteredBrands = this.brands.filter((brand: Brand) => brand.name.startsWith(startingAlphabet));
  }

  public searchProducts(searchString: string): void {
    this.searchProductSubject.next(searchString);
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

  public changeSelectedCurrency(event: Event): void {
    const selectMenu = event.target as HTMLSelectElement;
    localStorage.setItem("currency", selectMenu.value);
    window.location.reload();
  }

  private setupAvailableCurrencies(): Subscription {
    return this.webApiService.getCurrencyList().pipe(
      map(({ currencies }: CurrencyList) => currencies),
      map((currencies: Record<string, string>) => {
        const currencyArray: Array<Currency> = [];

        for (const [currencyCode, currencyName] of Object.entries(currencies)) {
          currencyArray.push({
            currencyCode,
            currencyName
          });
        }

        return currencyArray;
      }),
    ).subscribe((currencies: Array<Currency>) => {
      const currencyCodeFromStorage = localStorage.getItem("currency") ?? "AED";

      this.availableCurrencies = currencies;
      const selectedCurrency = currencies.find((currency: Currency) => currency.currencyCode === currencyCodeFromStorage);

      if (!selectedCurrency) return;
      this.selectedCurrency = selectedCurrency;
    });
  }

  private setupBrandsForHeader(): Subscription {
    this.fillEnglishAlphabets();
    const brandSubscription = this.fetchBrandsForHeader();
    this.filterBrand();

    return brandSubscription;
  }

  private fillEnglishAlphabets(): void {
    this.englishAlphabets = new Array(90 - 65).fill(null).map((_, index: number) => {
      return String.fromCharCode(index + 65);
    });
  }

  private fetchBrandsForHeader(): Subscription {
    return this.webApiService.getBrandsForHeader().pipe(
      map(({ data }: { data: Array<Brand> }) => data),
    ).subscribe((brands: Array<Brand>) => this.brands = brands);
  }

  private observeProductSearch(): Subscription {
    return this.searchProductSubject
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
