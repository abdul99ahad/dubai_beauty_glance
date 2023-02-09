import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { WebApiService } from "src/app/services/web-api.service";
import { ActivatedRoute } from "@angular/router";
import { map, Observable } from "rxjs";
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";

@Component({
  selector: "app-category-products-listing",
  templateUrl: "./category-products-listing.component.html",
  styleUrls: ["./category-products-listing.component.scss"],
})
export class CategoryProductsListingComponent implements OnInit {
  @Input("title") public title: string = "PRODUCTS";
  public products: Array<Product> = [];
  public productPageButtons: Array<IPageButton> = [];

  public constructor(private readonly route: ActivatedRoute, private readonly webApiService: WebApiService) {}

  public ngOnInit(): void {
    const categorySlug = this.route.snapshot.paramMap.get("slug");
    if (!categorySlug) throw new Error("Category slug not available!");

    this.fetchProductsOfCategoryWithSlug(categorySlug);
  }

  public fetchProductsOfCategoryWithUrl(categoryUrl: string): void {
    const productsObservable = this.webApiService.getCategoryProductsWithUrl(categoryUrl);

    this.handleBrandProducts(productsObservable);

  }

  public fetchProductsOfCategoryWithSlug(categorySlug: string): void {
    const productsObservable = this.webApiService.getCategoryProductsWithSlug(categorySlug);

    this.handleBrandProducts(productsObservable);
  }

  private handleBrandProducts(productsObservable: Observable<PaginatedResponse<Product>>): void {
    productsObservable.pipe(
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
