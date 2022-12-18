import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() productTitle: string =
    'Beauty of joseon Relief Sun Rice Probiotics 50ml'; //TODO:
  @Input() brand: string = 'The History of WHOO';
  @Input() currencyUsed: string = 'USD';
  @Input() unitPrice: number = 60.0;
  // @Input() price: number = 60.0;
  @Input() unitDiscountedPrice: number = 51.0;
  @Input() productDetail: string =
    'The History of Whoo Radiant White Moisture Cushion Foundation 13g + Refill 13g #21 light beige';
  @Input() minimumOrder: number = 1;
  @Input() selectedQuantity: number = 1;
  country: string = 'PK';
  checked: boolean = true;

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
  price: number = this.unitPrice;
  discountedPrice: number = this.unitDiscountedPrice;

  floatPrice: string = this.price.toPrecision(4);
  floatDiscountedPrice: string = this.discountedPrice.toPrecision(4);

  constructor() {}

  ngOnInit(): void {}

  quantityUp(): void {
    this.selectedQuantity++;
    this.updatePrice(this.selectedQuantity);
  }

  quantityDown(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
      this.updatePrice(this.selectedQuantity);
    }
  }

  checkSkuItemTrue(item: any): void {
    // item.checked = true;
    this.skus[0].checked = false;
  }

  private numberToFloat() {
    this.floatPrice = this.price.toPrecision(
      ((Math.log(this.price) * Math.LOG10E + 1) | 0) + 2
    );
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(
      ((Math.log(this.discountedPrice) * Math.LOG10E + 1) | 0) + 2
    );
  }

  updatePrice(quantity: number) {
    if (quantity <= 0) return;
    this.price = this.unitPrice * quantity;
    this.discountedPrice = this.unitDiscountedPrice * quantity;
    this.numberToFloat();
  }
}
