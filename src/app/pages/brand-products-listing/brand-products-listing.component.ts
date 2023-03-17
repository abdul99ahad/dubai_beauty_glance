import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import { ActivatedRoute } from '@angular/router';
import {
  IPageButton,
  PaginatedResponse,
} from '../../interfaces/response.interface';
import { map, Observable } from 'rxjs';
import { Brand } from 'src/app/interfaces/brand.interface';

@Component({
  selector: 'app-brand-products-listing',
  templateUrl: './brand-products-listing.component.html',
  styleUrls: ['./brand-products-listing.component.scss'],
})
export class BrandProductListingComponent implements OnInit {
  @Input('title') public title: string = 'PRODUCTS';
  public products: Array<Product> = [];
  public productPageButtons: Array<IPageButton> = [];
  public brandImgUrl: string = '';
  public brandDetail: Brand;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((val) => {
      const brandSlug = this.route.snapshot.paramMap.get('slug');
      this.title = brandSlug?.toUpperCase() || 'PRODUCTS';
      if (!brandSlug) throw new Error('Brand slug not available!');
      this.fetchBrandDetails(brandSlug).subscribe(
        (response: { data: Brand }) => {
          this.title = response.data.name;
          this.brandImgUrl =
            this.webApiService.imgUrl + response.data.brand_banner_image;
        }
      );
      this.fetchProductsOfBrandWithSlug(brandSlug);
    });
  }

  public fetchProductsOfBrandWithUrl(brandUrl: string): void {
    const productsObservable =
      this.webApiService.getBrandProductsWithUrl(brandUrl);

    this.handleCategoryProducts(productsObservable);
  }

  public fetchProductsOfBrandWithSlug(brandSlug: string): void {
    const productsObservable =
      this.webApiService.getBrandProductsWithSlug(brandSlug);

    this.handleCategoryProducts(productsObservable);
  }

  public fetchBrandDetails(brandSlug: string): Observable<{ data: Brand }> {
    return this.webApiService.getBrandDetails(brandSlug);
  }

  private handleCategoryProducts(
    productsObservable: Observable<PaginatedResponse<Product>>
  ): void {
    productsObservable
      .pipe(
        map((response: PaginatedResponse<Product>) => {
          response.data = response.data.map((product: Product) => {
            product.image = this.webApiService.imgUrl + product.image;

            return product;
          });

          return response;
        })
      )
      .subscribe((response: PaginatedResponse<Product>) => {
        this.products = response.data;
        this.productPageButtons = response.meta.links;
      });
  }
}
