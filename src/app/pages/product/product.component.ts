import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WebApiService } from "../../services/web-api.service";
import { map } from "rxjs";
import { ProductDetail } from "../../interfaces/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public selectedQuantity: number;
  public totalPrice: number;
  public discountedTotalPrice: number;

  checked: boolean = true;
  display: boolean = false;

  skus: any = [
    {
      productId: 1,
      sku: '2N Black',
      checked: false,
    },
    {
      productId: 1,
      sku: '6N Light Brown',
      checked: false,
    },
  ];

  public productDetails: ProductDetail;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly webApiService: WebApiService,
  ) {}

  public ngOnInit(): void {
    this.fetchProductDetails();
  }

  public fetchProductDetails(): void {
    const productSlug = this.route.snapshot.paramMap.get("slug");
    if (!productSlug) throw new Error("Product slug unavailable!");

    this.webApiService.getProductDetails(productSlug).pipe(
      map((response: { data: ProductDetail }) => response.data),
      map((product: ProductDetail) => {
        product.image = this.webApiService.imgUrl + product.image;
        product.brand.country_flag = this.webApiService.imgUrl + product.brand.country_flag;

        return product;
      }),
    ).subscribe((product: ProductDetail) => {
      this.productDetails = product;

      this.initializeProductInitialStates(product);
    });
  }

  public initializeProductInitialStates(product: ProductDetail): void {
    this.selectedQuantity = product.min_order_quantity;
  }

  @HostListener('mousewheel', ['$event'])
  onMousewheel(event: any) {
    // this.display = true;
    this.display = event.pageY > event.view.outerHeight * 1.5;
  }

  quantityUp(): void {
    this.selectedQuantity++;
    this.updateTotalPrice(this.selectedQuantity);
  }

  quantityDown(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
      this.updateTotalPrice(this.selectedQuantity);
    }
  }

  checkSkuItemTrue(item: any): void {
    // item.checked = true;
    this.skus[0].checked = false;
    // $('')
  }
  showDialog(): void {
    this.display = true;
  }

  public updateTotalPrice(quantity: number): void {
    if (quantity <= 0) return;

    this.totalPrice = (+this.productDetails.price) * quantity;
    this.discountedTotalPrice = (+(this.productDetails.discount_price ?? 0)) * quantity;
  }
}
