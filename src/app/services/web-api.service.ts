import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { ApiRoutes } from "src/app/const/api-routes";
import { CategoryWithChildren } from "../interfaces/categories.interface";
import { Product } from "../interfaces/product.interface";
import { PaginatedResponse } from "../interfaces/response.interface";
import { environment } from "src/environments/environment";
import { Brand } from "../interfaces/brand.interface";

@Injectable({
  providedIn: "root",
})
export class WebApiService {
  imgUrl: string = environment.imgUrl;

  public constructor(private readonly httpService: HttpService) {}

  getProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? ApiRoutes.products, !!url);
  }

  getPromotionalProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? `${ ApiRoutes.products }?promotional=1`, !!url);
  }

  public getBrandProductsWithUrl(brandCompleteUrl: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(brandCompleteUrl, true);
  }

  public getBrandProductsWithSlug(brandSlug: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(`${ApiRoutes.brand}/${encodeURI(brandSlug)}`);
  }

  getCategoryProducts(id: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(ApiRoutes.category + "/" + encodeURI(id));
  }

  getBrands(url?: string): Observable<PaginatedResponse<Brand>> {
    return this.httpService.get(url ?? ApiRoutes.brands, !!url);
  }

  getCategories(): Observable<{ data: Array<CategoryWithChildren> }> {
    return this.httpService.get<{ data: Array<CategoryWithChildren> }>(ApiRoutes.categories);
  }
}
