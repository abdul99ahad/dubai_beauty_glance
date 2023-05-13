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
/*import { CurrencyList } from '../interfaces/currencies.interface';
import { CurrencyApiKey } from '../const/api-key';*/
import { CurrencyService } from './currency.service';
import { Setting } from '../interfaces/setting.interface';
import { Banner } from '../interfaces/banner.interface';
import { QuickCategory } from '../interfaces/quick-categories.interface';
import { AddressBook } from '../interfaces/address-book.interface';
import { Enum } from '../interfaces/enum.interface';
import { Checkout, OrderDetails } from '../interfaces/checkout.interface';
import { OrderDetailsHistory } from '../interfaces/order-details.interface';

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

  public getQuickCategories(): Observable<{ data: Array<QuickCategory> }> {
    return this.httpService.get<{ data: Array<QuickCategory> }>(
      ApiRoutes.quickCategories
    );
  }

  /*public getCurrencyList(): Observable<CurrencyList> {
    return this.httpService.getWithApiKey(
      'https://api.apilayer.com/currency_data/list',
      'apikey',
      CurrencyApiKey
    );
  }*/

  public getProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      url ?? ApiRoutes.product,
      !!url
    );
  }

  public getSearchedProducts(
    productName: string
  ): Observable<{ data: Array<Product> }> {
    return this.httpService.get<{ data: Array<Product> }>(
      `${ApiRoutes.product}?paginate=0&productName=${productName}`
    );
  }

  public getLatestProducts(): Observable<{ data: Array<Product> }> {
    return this.httpService.get<{ data: Array<Product> }>(
      `${ApiRoutes.product}?paginate=0&latest=1&numOfProducts=10&with[]=brand`
    );
  }

  public getBestBrands(): Observable<{ data: Array<Brand> }> {
    return this.httpService.get(`${ApiRoutes.brandWithProducts}`);
  }

  public getBrandProductsWithSlugForSlider(
    brandSlug: string
  ): Observable<{ data: Array<Product> }> {
    return this.httpService.get<{ data: Array<Product> }>(
      `${ApiRoutes.brand}/${encodeURI(brandSlug)}/${
        ApiRoutes.products
      }?latest=1&paginate=0&numOfProducts=10`
    );
  }

  public getProductDetails(
    productSlug: string
  ): Observable<{ data: ProductDetail }> {
    return this.httpService.get<{ data: ProductDetail }>(
      `${ApiRoutes.product}/${productSlug}`
    );
  }

  public getPromotionalProducts(
    url?: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      url ?? `${ApiRoutes.product}?promotional=1`,
      !!url
    );
  }

  public getBrandProductsWithUrl(
    brandCompleteUrl: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      brandCompleteUrl,
      true
    );
  }

  public getBrandProductsWithSlug(
    brandSlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      `${ApiRoutes.brand}/${encodeURI(brandSlug)}`
    );
  }

  public getCategoryProductsWithUrl(
    categoryCompleteUrl: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      categoryCompleteUrl,
      true
    );
  }

  public getCategoryProductsWithSlug(
    categorySlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      `${ApiRoutes.category}/${encodeURI(categorySlug)}/${ApiRoutes.products}`
    );
  }

  public getTagProductsWithSlug(
    tagSlug: string
  ): Observable<PaginatedResponse<Product>> {
    return this.httpService.get<PaginatedResponse<Product>>(
      `${ApiRoutes.tag}/${encodeURI(tagSlug)}`
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

  public createAddress(
    address: AddressBook
  ): Observable<{ data: AddressBook }> {
    return this.httpService.post<{ data: AddressBook }>(
      ApiRoutes.createAddress,
      address
    );
  }

  public updateAddress(
    address: AddressBook
  ): Observable<{ data: AddressBook }> {
    return this.httpService.patch<{ data: AddressBook }>(
      ApiRoutes.updateAddress + '/' + address.id,
      address
    );
  }

  public deleteAddress(address: AddressBook): Observable<{ data: boolean }> {
    return this.httpService.delete<{ data: boolean }>(
      ApiRoutes.deleteAddress + '/' + address.id
    );
  }

  public getAddressses(): Observable<{ data: Array<AddressBook> }> {
    return this.httpService.get<{ data: Array<AddressBook> }>(
      ApiRoutes.address
    );
  }

  public getPaymentMethods(): Observable<{ data: Array<Enum> }> {
    return this.httpService.get<{ data: Array<Enum> }>(
      ApiRoutes.paymentMethods
    );
  }

  public getShippingMethods(): Observable<{ data: Array<Enum> }> {
    return this.httpService.get<{ data: Array<Enum> }>(
      ApiRoutes.shippingMethods
    );
  }

  public createOrder(order: Checkout): Observable<{ data: Checkout }> {
    return this.httpService.post<{ data: Checkout }>(
      ApiRoutes.checkoutIdentifiedOrder,
      order
    );
  }

  public getOrderHistory(): Observable<{ data: Array<OrderDetailsHistory> }> {
    return this.httpService.get<{ data: Array<OrderDetailsHistory> }>(
      ApiRoutes.orderHistory
    );
  }
}
