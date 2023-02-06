import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product.interface";
import { WebApiService } from "src/app/services/web-api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category-products-listing",
  templateUrl: "./category-products-listing.component.html",
  styleUrls: ["./category-products-listing.component.scss"],
})
export class CategoryProductsListingComponent implements OnInit {
  @Input("title") title: string = "PRODUCTS";
  public products: Array<Product>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService
  ) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.title = id;
    this.webApiService.getCategoryProducts(id).subscribe((data) => {
      this.products = data.data;
      this.products.forEach((prod) => {
        prod.image = this.webApiService.imgUrl + prod.image;
      });
    });
  }
}
