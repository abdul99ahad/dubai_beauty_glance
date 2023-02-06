import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { WebApiService } from "src/app/services/web-api.service";
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";
import { map } from "rxjs";

@Component({
  selector: "app-products-listing",
  templateUrl: "./products-listing.component.html",
  styleUrls: ["./products-listing.component.scss"],
})
export class ProductsListingComponent implements OnInit {
  @Input("title") public title: string = "PRODUCTS";
  public products: Product[];
  public productsPageButtons: Array<IPageButton> = [];


  public constructor(private webApiService: WebApiService) {}

  public ngOnInit(): void {
    this.fetchProducts();
  }

  public fetchProducts(): void;
  public fetchProducts(url: string): void;
  public fetchProducts(url?: string): void {
    this.webApiService.getProducts(url).pipe(
      map((response: PaginatedResponse<Product>) => {
        response.data = response.data.map((product: Product) => {
          product.image = this.webApiService.imgUrl + product.image;

          return product;
        });

        return response;
      }),
    ).subscribe((response: PaginatedResponse<Product>) => {
      this.products = response.data;
      this.productsPageButtons = response.meta.links;
    });
  }
}
