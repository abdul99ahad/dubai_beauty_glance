import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { ApiRoutes } from 'src/app/const/api-routes';
import { Category } from '../interfaces/categories.interface';
import { Product } from '../interfaces/product.interface';
import { Response1 } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Brand } from '../interfaces/brand.interface';

@Injectable({
  providedIn: 'root',
})
export class WebApiService {
  imgUrl: string = environment.imgUrl;
  constructor(private httpService: HttpService, private router: Router) {}

  getProducts(): Observable<Response1<Product>> {
    return this.httpService.get(ApiRoutes.products);
  }

  getBrandProducts(id: string): Observable<Response1<Product>> {
    return this.httpService.get(ApiRoutes.brand + '/' + encodeURI(id));
  }

  getCategoryProducts(id: string): Observable<Response1<Product>> {
    return this.httpService.get(ApiRoutes.category + '/' + encodeURI(id));
  }

  getBrands(): Observable<Response1<Brand>> {
    return this.httpService.get(ApiRoutes.brands);
  }

  getCategories(): Observable<Response1<Category>> {
    return this.httpService.get(ApiRoutes.categories);
  }
}
