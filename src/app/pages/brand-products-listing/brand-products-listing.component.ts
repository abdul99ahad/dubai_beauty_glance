import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";
import { map } from "rxjs";
@Component({
  selector: 'app-brand-products-listing',
  templateUrl: './brand-products-listing.component.html',
  styleUrls: ['./brand-products-listing.component.scss'],
})
export class BrandProductListingComponent implements OnInit {
  @Input('title') title: string = 'PRODUCTS'; //TODO:
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private webApiService: WebApiService
  ) {}

  public products: Array<Product> = [];
  public productPageButtons: Array<IPageButton> = [];

  public ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get("id");
    if (!brandId) throw new Error("Brand id not available!");

    this.fetchProductsOfBrand(+brandId);
  }

  public fetchProductsOfBrand(urlOrBrandId: number): void;
  public fetchProductsOfBrand(urlOrBrandId: string): void;
  public fetchProductsOfBrand(urlOrBrandId: number | string): void {
    this.webApiService.getBrandProducts(urlOrBrandId).pipe(
      map((response: PaginatedResponse<Product>) => {
        response.data = response.data.map((product: Product) => {
          product.image = this.webApiService.imgUrl + product.image;

          return product;
        });

        return response;
      })
    ).subscribe((response: PaginatedResponse<Product>) => {
      this.products = response.data;
      this.productPageButtons = response.meta.links;
    });

  }
}
