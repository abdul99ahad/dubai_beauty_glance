import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
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
  price: number = this.unitPrice;
  discountedPrice: number = this.unitDiscountedPrice;

  floatPrice: string = this.price.toPrecision(4);
  floatDiscountedPrice: string = this.discountedPrice.toPrecision(4);

  constructor() {}

  ngOnInit(): void {}

  @HostListener('mousewheel', ['$event'])
  onMousewheel(event: any) {
    if (this.display) return;
    this.display = true;
  }

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

  updatePrice(quantity: number) {
    if (quantity <= 0) return;
    this.price = this.unitPrice * quantity;
    this.discountedPrice = this.unitDiscountedPrice * quantity;
    this.numberToFloat();
  }
}
