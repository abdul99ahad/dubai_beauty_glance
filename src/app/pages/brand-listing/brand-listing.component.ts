import { Component, Input, OnInit } from "@angular/core";
// import { ProductService } from 'src/app/services/product.service';
import { WebApiService } from "src/app/services/web-api.service";
import { Brand } from "src/app/interfaces/brand.interface";
import { map } from "rxjs";
import { IPageButton, PaginatedResponse } from "../../interfaces/response.interface";

@Component({
  selector: "app-brands-listing",
  templateUrl: "./brand-listing.component.html",
  styleUrls: ["./brand-listing.component.scss"],
})
export class BrandsListingComponent implements OnInit {
  @Input("title") public title: string = "BRANDS";
  public brands: Brand[];
  public brandPageButtons: Array<IPageButton> = [];

  public constructor(private webApiService: WebApiService) {}

  ngOnInit(): void {
    this.fetchBrands();
  }

  public fetchBrands(): void;
  public fetchBrands(url: string): void;
  public fetchBrands(url?: string): void {
    this.webApiService.getBrands(url).pipe(
      map((response: PaginatedResponse<Brand>) => {
        response.data = response.data.map((product: Brand) => {
          product.brand_image = this.webApiService.imgUrl + product.brand_image;
          product.country_flag = this.webApiService.imgUrl + product.country_flag;

          return product;
        });

        return response;
      }),
    ).subscribe((response: PaginatedResponse<Brand>) => {
      this.brands = response.data;
      this.brandPageButtons = response.meta.links;
    });
  }
}
