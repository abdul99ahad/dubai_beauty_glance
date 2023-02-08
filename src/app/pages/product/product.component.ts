import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WebApiService } from "../../services/web-api.service";
import { map } from "rxjs";
import { ProductDetail } from "../../interfaces/product.interface";

type SelectedProductOption = { [productOptionIndex: number]: boolean };

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  public selectedQuantity: number;
  public totalPrice = 0.00;
  public discountedTotalPrice = 0.00;

  checked: boolean = true;
  display: boolean = false;

  public checkedOptions: SelectedProductOption = {};

  public productDetail: ProductDetail;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService,
  ) {
  }

  public ngOnInit(): void {
    this.fetchProductDetails();
  }

  public fetchProductDetails(): void {
    const productSlug = this.route.snapshot.paramMap.get("slug");
    if (!productSlug) throw new Error("Product slug unavailable!");

    this.webApiService.getProductDetails(productSlug).pipe(
      map((response: { data: ProductDetail }) => response.data),
      map((productDetail: ProductDetail) => {
        productDetail.image = this.webApiService.imgUrl + productDetail.image;
        productDetail.brand.country_flag = this.webApiService.imgUrl + productDetail.brand.country_flag;

        return productDetail;
      }),
    ).subscribe((productDetail: ProductDetail) => {
      this.productDetail = productDetail;

      this.selectedQuantity = productDetail.min_order_quantity;
      this.updateTotalPrice(this.selectedQuantity);
    });
  }

  @HostListener("wheel", ["$event"])
  public onMousewheel(event: WheelEvent): void {
    this.display = event.pageY > (event.view)!.outerHeight * 1.5;
  }

  public quantityUp(): void {
    this.selectedQuantity++;
    this.updateTotalPrice(this.selectedQuantity);
  }

  public quantityDown(): void {
    if (this.selectedQuantity > this.productDetail.min_order_quantity) {
      this.selectedQuantity--;
      this.updateTotalPrice(this.selectedQuantity);
    }
  }

  public toggleProductOptionSelection(productOptionIndex: number): void {
    if (this.checkedOptions[productOptionIndex]) {
      this.checkedOptions[productOptionIndex] = !this.checkedOptions[productOptionIndex];

      return;
    }

    this.checkedOptions[productOptionIndex] = true;
  }

  public updateTotalPrice(quantity: number): void {
    if (quantity <= 0) return;

    const productPrice = this.productDetail.discount_price ? +this.productDetail.discount_price : +this.productDetail.price;

    this.totalPrice = parseFloat((+this.productDetail.price * quantity).toFixed(2));
    this.discountedTotalPrice = parseFloat((productPrice * quantity).toFixed(2));
  }
}
