import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { HttpService } from './http.service';
import { ApiRoutes } from 'src/app/const/api-routes';
import {
  Category,
  CategoryWithChildren,
} from '../interfaces/categories.interface';
import { Product, ProductDetail } from '../interfaces/product.interface';
import { PaginatedResponse } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Brand } from '../interfaces/brand.interface';
import { CurrencyList } from '../interfaces/currencies.interface';
import { CurrencyApiKey } from '../const/api-key';
import { CurrencyService } from './currency.service';
import { Setting } from '../interfaces/setting.interface';
import { Banner } from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root',
})
export class WebApiService {
  imgUrl: string = environment.imgUrl;

  public constructor(
    private readonly httpService: HttpService,
    private readonly currencyService: CurrencyService
  ) {}

  public getSetting(): Observable<{ data: Setting }> {
    return this.httpService.get<{ data: Setting }>(`${ApiRoutes.setting}`);
  }

  public getBanners(type: string): Observable<{ data: Array<Banner> }> {
    return this.httpService.get<{ data: Array<Banner> }>(
      `${ApiRoutes.banners}/${type}`
    );
  }

  public getCurrencyList(): Observable<CurrencyList> {
    return this.httpService.getWithApiKey(
      'https://api.apilayer.com/currency_data/list',
      'apikey',
      CurrencyApiKey
    );
  }

  public getProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(url ?? ApiRoutes.product, !!url)
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getSearchedProducts(
    productName: string
  ): Observable<{ data: Array<Product> }> {
    return this.httpService
      .get<{ data: Array<Product> }>(
        `${ApiRoutes.product}?paginate=0&productName=${productName}`
      )
      .pipe(
        switchMap((data: { data: Array<Product> }) => {
          return from(
            this.currencyService.handleCurrency<{ data: Array<Product> }>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getLatestProducts(): Observable<{ data: Array<Product> }> {
    return this.httpService
      .get<{ data: Array<Product> }>(
        `${ApiRoutes.product}?paginate=0&latest=1&numOfProducts=10&with[]=brand`
      )
      .pipe(
        switchMap((data: { data: Array<Product> }) => {
          return from(
            this.currencyService.handleCurrency<{ data: Array<Product> }>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getBestBrands(): Observable<{ data: Array<Brand> }> {
    return this.httpService.get(`${ApiRoutes.brandWithProducts}`);
  }

  public getBrandProductsWithSlugForSlider(
    brandSlug: string
  ): Observable<{ data: Array<Product> }> {
    return this.httpService
      .get<{ data: Array<Product> }>(
        `${ApiRoutes.brand}/${encodeURI(
          brandSlug
        )}/${ApiRoutes.products}?latest=1&paginate=0&numOfProducts=10`
      )
      .pipe(
        switchMap((data: { data: Array<Product> }) => {
          return from(
            this.currencyService.handleCurrency<{ data: Array<Product> }>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getProductDetails(
    productSlug: string
  ): Observable<{ data: ProductDetail }> {
    return this.httpService
      .get<{ data: ProductDetail }>(`${ApiRoutes.product}/${productSlug}`)
      .pipe(
        switchMap((data: { data: ProductDetail }) => {
          return from(
            this.currencyService.handleCurrency<{ data: ProductDetail }>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getPromotionalProducts(
    url?: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(
        url ?? `${ApiRoutes.product}?promotional=1`,
        !!url
      )
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getBrandProductsWithUrl(
    brandCompleteUrl: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(brandCompleteUrl, true)
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getBrandProductsWithSlug(
    brandSlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(
        `${ApiRoutes.brand}/${encodeURI(brandSlug)}`
      )
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getCategoryProductsWithUrl(
    categoryCompleteUrl: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(categoryCompleteUrl, true)
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getCategoryProductsWithSlug(
    categorySlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(
        `${ApiRoutes.category}/${encodeURI(categorySlug)}/${ApiRoutes.products}`
      )
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getTagProductsWithSlug(
    tagSlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService
      .get<PaginatedResponse<Product>>(`${ApiRoutes.tag}/${encodeURI(tagSlug)}`)
      .pipe(
        switchMap((data: PaginatedResponse<Product>) => {
          return from(
            this.currencyService.handleCurrency<PaginatedResponse<Product>>(
              data,
              'price',
              'discount_price'
            )
          );
        })
      );
  }

  public getBrands(url?: string): Observable<PaginatedResponse<Brand>> {
    return this.httpService.get(url ?? ApiRoutes.brand, !!url);
  }

  public getBrandsForHeader(): Observable<{ data: Array<Brand> }> {
    return this.httpService.get(`${ApiRoutes.brand}?paginate=0`);
  }

  public getCategories(): Observable<{ data: Array<CategoryWithChildren> }> {
    return this.httpService.get<{ data: Array<CategoryWithChildren> }>(
      ApiRoutes.category
    );
  }

  public getBrandDetails(brandSlug: string): Observable<{ data: Brand }> {
    return this.httpService.get<{ data: Brand }>(
      `${ApiRoutes.brand}/${encodeURI(brandSlug)}`
    );
  }

  public getCategoryDetails(
    categorySlug: string
  ): Observable<{ data: Category }> {
    return this.httpService.get<{ data: Category }>(
      `${ApiRoutes.category}/${encodeURI(categorySlug)}`
    );
  }
}
