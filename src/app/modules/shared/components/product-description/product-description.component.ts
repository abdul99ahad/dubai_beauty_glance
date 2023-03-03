import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
  @Input() currencyUsed: string = '$';
  @Input() selectedQuantity: number = 1;

  @Input() totalPrice: number = 0;
  @Input() productDetail: ProductDetail;
  country: string = 'PK';
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
  price: number;
  discountedPrice: number;

  floatPrice: string;
  floatDiscountedPrice: string;

  constructor() {}

  ngOnInit(): void {
    this.price = parseFloat(this.productDetail.price);
    this.discountedPrice = parseFloat(
      this.productDetail.discount_price
        ? this.productDetail.discount_price
        : '1'
    );

    this.floatPrice = this.price.toPrecision(4);
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(4);
  }

  @HostListener('mousewheel', ['$event'])
  onMousewheel(event: any) {
    if (this.display) return;
    this.display = true;
  }

  checkSkuItemTrue(item: any): void {
    // item.checked = true;
    this.skus[0].checked = false;
    // $('')
  }
  showDialog(): void {
    this.display = true;
  }

  private numberToFloat() {
    this.floatPrice = this.price.toPrecision(
      ((Math.log(this.price) * Math.LOG10E + 1) | 0) + 2
    );
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(
      ((Math.log(this.discountedPrice) * Math.LOG10E + 1) | 0) + 2
    );
  }

  public quantityUp(): void {
    // this.selectedQuantity++;
    // this.updateTotalPrice(this.selectedQuantity);
  }

  public quantityDown(): void {
    // if (this.selectedQuantity > this.productDetail.min_order_quantity) {
    //   this.selectedQuantity--;
    //   this.updateTotalPrice(this.selectedQuantity);
    // }
  }
}
