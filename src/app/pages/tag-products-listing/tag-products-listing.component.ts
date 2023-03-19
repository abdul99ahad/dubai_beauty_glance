import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  IPageButton,
  PaginatedResponse,
} from '../../interfaces/response.interface';

@Component({
  selector: 'app-tag-products-listing',
  templateUrl: './tag-products-listing.component.html',
  styleUrls: ['./tag-products-listing.component.scss'],
})
export class TagProductsListingComponent implements OnInit {
  @Input('title') public title: string = 'PRODUCTS';
  public products: Array<Product> = [];
  public productPageButtons: Array<IPageButton> = [];
  public categoryImgUrl: string = '';

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((val) => {
      const tagSlug = this.route.snapshot.paramMap.get('slug');
      this.title = tagSlug || 'PRODUCTS';
      if (!tagSlug) throw new Error('Tag slug not available!');
      // this.fetchCategoryDetails(categorySlug).subscribe(
      //   (response: { data: Category }) => {
      //     this.title = response.data.name;
      //     this.categoryImgUrl = this.webApiService.imgUrl + response.data.image;
      //   }
      // );
      this.fetchProductsOfCategoryWithSlug(tagSlug);
    });
  }

  public fetchProductsOfCategoryWithSlug(tagSlug: string): void {
    const productsObservable =
      this.webApiService.getTagProductsWithSlug(tagSlug);

    this.handleBrandProducts(productsObservable);
  }

  private handleBrandProducts(
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
