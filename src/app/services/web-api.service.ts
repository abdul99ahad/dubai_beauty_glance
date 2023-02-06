import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { ApiRoutes } from "src/app/const/api-routes";
import { Category } from "../interfaces/categories.interface";
import { Product } from "../interfaces/product.interface";
import { PaginatedResponse } from "../interfaces/response.interface";
import { environment } from "src/environments/environment";
import { Brand } from "../interfaces/brand.interface";

@Injectable({
  providedIn: "root",
})
export class WebApiService {
  imgUrl: string = environment.imgUrl;

  constructor(private httpService: HttpService, private router: Router) {
  }

  getProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? ApiRoutes.products, !!url);
  }

  getPromotionalProducts(url?: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(url ?? `${ ApiRoutes.products }?promotional=1`, !!url);
  }

  getBrandProducts(id: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(ApiRoutes.brand + "/" + encodeURI(id));
  }

  getCategoryProducts(id: string): Observable<PaginatedResponse<Product>> {
    return this.httpService.get(ApiRoutes.category + "/" + encodeURI(id));
  }

  getBrands(url?: string): Observable<PaginatedResponse<Brand>> {
    return this.httpService.get(url ?? ApiRoutes.brands, !!url);
  }

  getCategories(): Observable<PaginatedResponse<Category>> {
    return this.httpService.get(ApiRoutes.categories);
  }
}
