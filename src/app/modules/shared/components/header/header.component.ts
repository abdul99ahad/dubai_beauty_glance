import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, Subject, Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Brand } from '../../../../interfaces/brand.interface';
import { WebApiService } from '../../../../services/web-api.service';
import { Product } from '../../../../interfaces/product.interface';
import {
  CurrencyList,
  Currency,
} from '../../../../interfaces/currencies.interface';
import { BaseComponent } from '../../../../base/base.component';
import { CurrencyService } from '../../../../services/currency.service';
import { Setting } from '../../../../interfaces/setting.interface';
import { CartService } from 'ng-shopping-cart';
import { ProductCartItem } from 'src/app/utilities/productCartItem';
import { AuthService } from 'src/app/services/auth.service';
import { CartProduct } from 'src/app/interfaces/cart-product.interface';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() setting: Setting;
  cartItemsQuantity: number = 0;
  wishListItemsQuantity: number = 0;
  expandedState: boolean = false;
  mobileDisplay: boolean = false;
  public email: string | null;
  navBarItemList: any = [
    {
      page: 'NEW',
      url: 'products',
    },
    {
      page: 'BEST',
      url: 'products',
    },
    {
      page: 'TIME DEAL',
      url: 'products',
    },
    {
      page: 'PROMOTIONS',
      url: 'promotions',
    },
    {
      page: 'BRAND',
      url: 'brands',
    },
    {
      page: 'COUPON',
      url: 'products',
    },
  ];

  navBarItemListMobile: any = [
    {
      page: 'NEW',
      url: 'products',
    },
    {
      page: 'BEST',
      url: 'products',
    },
    {
      page: 'TIME DEAL',
      url: 'products',
    },
    {
      page: 'PROMOTIONS',
      url: 'promotions',
    },
  ];
  display: boolean = false;

  public productSearchInputStyles = {
    width: '100%',
    'border-top-style': 'hidden',
    'border-right-style': 'hidden',
    'border-left-style': 'hidden',
    'border-bottom-style': 'groove',
    'border-bottom-width': 'thick',
    'border-bottom-color': 'black',
    'min-width': '90%',
    height: '100%',
  };

  public productSearchMobileViewInputStyles = {
    width: '100%',
    height: '35px',
    padding: '0 0 0 20px',
    border: '0',
    'border-radius': '30px',
    background: '#ededed',
  };

  public selectedCurrency: Currency;
  public availableCurrencies: Array<Currency> = [];

  public englishAlphabets: Array<string> = [];
  public brands: Array<Brand> = [];
  public filteredBrands: Array<Brand> = [];

  public products: Array<Product> = [];
  public searchProductSubject = new Subject<string>();
  cartList: ProductCartItem[];
  wishList: ProductCartItem[];
  cost: number;
  currency: string;
  public cartDisplay: boolean;
  public wishListDisplay: boolean;
  public cartProduct: CartProduct = {
    name: '',
    image: '',
    slug: '',
  };

  public wishListProduct: CartProduct = {
    name: '',
    image: '',
    slug: '',
  };

  public constructor(
    private readonly currencyService: CurrencyService,
    private readonly webApiService: WebApiService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private cartService: CartService<ProductCartItem>,
    private wishListService: WishListService<ProductCartItem>
  ) {
    super();
    this.cartItemsQuantity = cartService.itemCount();
    this.wishListItemsQuantity = wishListService.itemCount();
    this.currency = this.currencyService.selectedCurrency;
    this.updateCartList();
    this.wishListService.onChange.subscribe((itemCount) => {
      this.wishListItemsQuantity = itemCount;
    });
    this.wishListService.addItemBehaviorObservable.subscribe((data) => {
      this.displayWishListPopUp(JSON.parse(data || ''));
    });
    this.cartService.onChange.subscribe({
      next: (event: Event) => {
        this.cartItemsQuantity = cartService.itemCount();
        this.updateCartList();
        if (this.cartList.length > 0)
          this.displayCartPopUp(this.cartList.slice(-1)[0]);
      },
    });
  }

  private displayWishListPopUp(product: ProductCartItem) {
    this.wishListDisplay = true;
    this.wishListProduct = {
      name: product.name,
      image: product.image,
      slug: product.slug,
    };
    debugger;
  }

  private displayCartPopUp(product: ProductCartItem) {
    this.cartDisplay = true;
    this.cartProduct = {
      name: product.name,
      image: product.image,
      slug: product.slug,
    };
  }

  public updateCartList() {
    this.cartList = this.cartService.getItems();
    this.cost = this.cartService.cost();
  }

  public updateWishList() {
    this.wishList = this.wishListService.getItems();
    // this.cost = this.cartService.cost();
  }

  deleteItemFromCart(id: number): void {
    this.cartService.removeItem(id);
    this.updateCartList();
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
    this.authService.navItem$.subscribe((data) => {
      if (data != '') this.email = data;
      else this.email = localStorage.getItem('user_email');
    });
    const searchSubscription = this.observeProductSearch();
    // const currencySubscription = this.setupAvailableCurrencies();
    const brandSubscription = this.setupBrandsForHeader();

    this.addSubscriptions(searchSubscription, brandSubscription);
  }

  public ngOnDestroy(): void {
    this.flushSubscriptions();
  }

  public signOut() {
    this.email = null;
    this.authService.logout();
  }

  public filterBrand(): void;
  public filterBrand(brandNameStartingAlphabet: string): void;
  public filterBrand(brandNameStartingAlphabet?: string): void {
    const startingAlphabet =
      brandNameStartingAlphabet ?? this.englishAlphabets[0];

    this.filteredBrands = this.brands.filter((brand: Brand) =>
      brand.name.startsWith(startingAlphabet)
    );
  }

  public searchProducts(searchString: string): void {
    this.searchProductSubject.next(searchString);
  }

  public toggleHamBurgerMenu(): void {
    this.display = !this.display;
  }

  public navigateToProduct(product: Product): void {
    this.router.navigate(['/product', product.slug]);
  }

  public changeSelectedCurrency(event: Event): void {
    const selectMenu = event.target as HTMLSelectElement;
    this.currencyService.selectedCurrency = selectMenu.value;
  }

  /*private setupAvailableCurrencies(): Subscription {
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
  }*/

  private setupBrandsForHeader(): Subscription {
    this.fillEnglishAlphabets();
    const brandSubscription = this.fetchBrandsForHeader();
    this.filterBrand();

    return brandSubscription;
  }

  private fillEnglishAlphabets(): void {
    this.englishAlphabets = new Array(90 - 65)
      .fill(null)
      .map((_, index: number) => {
        return String.fromCharCode(index + 65);
      });
  }

  private fetchBrandsForHeader(): Subscription {
    return this.webApiService
      .getBrandsForHeader()
      .pipe(map(({ data }: { data: Array<Brand> }) => data))
      .subscribe((brands: Array<Brand>) => (this.brands = brands));
  }

  private observeProductSearch(): Subscription {
    return this.searchProductSubject
      .pipe(
        switchMap((searchText: string) =>
          this.webApiService.getSearchedProducts(searchText)
        ),
        map(({ data }: { data: Array<Product> }) => data),
        map((products: Array<Product>) =>
          products.map((product: Product) => {
            product.image = this.webApiService.imgUrl + product.image;

            return product;
          })
        )
      )
      .subscribe((products: Array<Product>) => (this.products = products));
  }
}
