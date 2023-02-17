import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { ApiRoutes } from "src/app/const/api-routes";
import { CategoryWithChildren } from "../interfaces/categories.interface";
import { Product, ProductDetail } from "../interfaces/product.interface";
import { PaginatedResponse } from "../interfaces/response.interface";
import { environment } from "src/environments/environment";
import { Brand } from "../interfaces/brand.interface";

@Injectable({
  providedIn: "root",
})
export class WebApiService {
  imgUrl: string = environment.imgUrl;

  public constructor(private readonly httpService: HttpService) {
  }

  public getProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? ApiRoutes.products, !!url);
  }

  public getSearchedProducts(productName: string): Observable<{ data: Array<Product> }> {
    return this.httpService.get(`${ ApiRoutes.products }?paginate=0&productName=${ productName }`);
  }

  public getLatestProducts(): Observable<{ data: Array<Product> }> {
    return this.httpService.get(`${ ApiRoutes.products }?paginate=0&latest=1&numOfProducts=10`);
  }

  public getBestBrands(): Observable<{ data: Array<Brand> }> {
    return this.httpService.get(`${ ApiRoutes.brandWithProducts }`);
  }

  public getBrandProductsWithSlugForSlider(brandSlug: string): Observable<{ data: Array<Product> }> {
    return this.httpService.get(`${ ApiRoutes.brand }/${ encodeURI(brandSlug) }?latest=1&paginate=0&numOfProducts=10`);
  }

  public getProductDetails(productSlug: string): Observable<{ data: ProductDetail }> {
    return this.httpService.get(`${ ApiRoutes.product }/${ productSlug }`);
  }

  public getPromotionalProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? `${ ApiRoutes.products }?promotional=1`, !!url);
  }

  public getBrandProductsWithUrl(brandCompleteUrl: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(brandCompleteUrl, true);
  }

  public getBrandProductsWithSlug(brandSlug: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(`${ ApiRoutes.brand }/${ encodeURI(brandSlug) }`);
  }

  public getCategoryProductsWithUrl(categoryCompleteUrl: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(categoryCompleteUrl, true);
  }

  public getCategoryProductsWithSlug(categorySlug: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(`${ ApiRoutes.category }/${ encodeURI(categorySlug) }`);
  }

  public getBrands(url?: string): Observable<PaginatedResponse<Brand>> {
    return this.httpService.get(url ?? ApiRoutes.brands, !!url);
  }

  public getBrandsForHeader(): Observable<{ data: Array<Brand> }> {
    return this.httpService.get(`${ ApiRoutes.brands }?paginate=0`);
  }

  public getCategories(): Observable<{ data: Array<CategoryWithChildren> }> {
    return this.httpService.get<{ data: Array<CategoryWithChildren> }>(ApiRoutes.categories);
  }
}
