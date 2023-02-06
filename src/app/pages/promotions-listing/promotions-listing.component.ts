import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { WebApiService } from "../../services/web-api.service";
import { map } from "rxjs";
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";

@Component({
  selector: "app-promotions-listing",
  templateUrl: "./promotions-listing.component.html",
  styleUrls: ["./promotions-listing.component.scss"],
  providers: [],
})
export class PromotionsListingComponent implements OnInit {
  @Input("title") public title: string = "PROMOTIONS";
  public products: Array<Product> = [];
  public productsPageButtons: Array<IPageButton> = [];

  public constructor(private readonly webApiService: WebApiService) {}

  ngOnInit(): void {
    this.fetchPromotionalProducts();
  }

  public fetchPromotionalProducts(): void;
  public fetchPromotionalProducts(url: string): void;
  public fetchPromotionalProducts(url?: string): void {
    this.webApiService.getPromotionalProducts(url).pipe(
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
