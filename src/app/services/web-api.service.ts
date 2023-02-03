import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { ApiRoutes } from 'src/app/const/api-routes';
import { Category } from '../models/categories.model';
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

  getCategories() {
    return this.httpService.get<Category[]>(ApiRoutes.categories);
  }

  getProducts(): Observable<Response1<Product>> {
    return this.httpService.get(ApiRoutes.products);
  }

  getBrandProducts(id: string): Observable<Response1<Product>> {
    return this.httpService.get(ApiRoutes.brand + '/' + encodeURI(id));
  }

  getBrands(): Observable<Response1<Brand>> {
    return this.httpService.get(ApiRoutes.brands);
  }
}
