import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { WebApiService } from "src/app/services/web-api.service";
import { ActivatedRoute } from "@angular/router";
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-brand-products-listing",
  templateUrl: "./brand-products-listing.component.html",
  styleUrls: ["./brand-products-listing.component.scss"],
})
export class BrandProductListingComponent implements OnInit {
  @Input("title") title: string = "PRODUCTS";
  public products: Array<Product> = [];
  public productPageButtons: Array<IPageButton> = [];

  public constructor(
    private route: ActivatedRoute,
    private webApiService: WebApiService
  ) {}

  public ngOnInit(): void {
    const brandSlug = this.route.snapshot.paramMap.get("id");
    if (!brandSlug) throw new Error("Brand id not available!");

    this.fetchProductsOfBrandWithSlug(brandSlug);
  }

  public fetchProductsOfBrandWithUrl(brandUrl: string): void {
    const productsObservable = this.webApiService.getBrandProductsWithUrl(brandUrl);

    this.handleBrandProducts(productsObservable);
  }

  public fetchProductsOfBrandWithSlug(brandSlug: string): void {
    const productsObservable = this.webApiService.getBrandProductsWithSlug(brandSlug)

    this.handleBrandProducts(productsObservable);

  }

  private handleBrandProducts(productsObservable: Observable<PaginatedResponse<Product>>) {
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
