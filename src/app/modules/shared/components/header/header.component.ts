import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { debounce, interval, map, Subject, Subscription, switchMap } from "rxjs";

interface Product {
  name: string;
  slug: string;
  price: number;
  discount_price: number;
  image: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  expandedState: boolean = false;
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
      url: "products"
    },
    {
      page: "COUPON",
      url: "products"
    },
  ];

  navBarItemListMobile: any = [
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
  ];
  recentlyViewedItems: MenuItem[];
  display: boolean = false;

  public productSearchInputStyles = {
    "width": "100%",
    "border-top-style": "hidden",
    "border-right-style": "hidden",
    "border-left-style": "hidden",
    "border-bottom-style": "groove",
    "border-bottom-width": "thick",
    "border-bottom-color": "black",
    "min-width": "90%",
    "height": "100%",
  };

  public productSearchMobileViewInputStyles = {
    "width": "100%",
    "height": "35px",
    "padding": "0 0 0 20px",
    "border": "0",
    "border-radius": "30px",
    "background": "#ededed",
  };

  public products: Array<Product> = [];
  public searchProductDebouncedSubject: Subject<string> = new Subject<string>();
  private coldSubscriber: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.coldSubscriber.unsubscribe();
  }

  navBarMobileListViewToggle(): void {
    if (this.expandedState) {
      this.navBarItemListMobile = this.navBarItemListMobile.slice(0, 4);
    } else {
      this.navBarItemListMobile = this.navBarItemList;
    }
    this.expandedState = !this.expandedState;
  }

  ngOnInit(): void {
    this.recentlyViewedItems = [
      {
        label: "Item 1",
        icon: "pi pi-fw pi-plus"
      },
      {
        label: "Item 2",
        icon: "pi pi-fw pi-download"
      },
      {
        label: "Item 3",
        icon: "pi pi-fw pi-refresh"
      },
    ];

    this.setupColdSubscriberForLiveProductSearching();
  }

  public searchProducts(searchString: string): void {
    this.searchProductDebouncedSubject.next(searchString);
  }

  private setupColdSubscriberForLiveProductSearching() {
    this.coldSubscriber = this.searchProductDebouncedSubject.pipe(
      debounce(() => interval(1000)),
      switchMap((searchText: string) => this.http.get<{ data: Array<Product> }>(`https://api.technosavvyllc.com/beautymallkorea/public/api/products?paginate=0&productName=${ searchText }`)),
      map(({ data }) => data),
    ).subscribe((products: Array<Product>) => this.products = products);
  }
}
