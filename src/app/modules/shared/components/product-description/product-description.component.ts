import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent implements OnInit {
  @Input() productTitle: string; //TODO:
  @Input() brand: string;
  @Input() currencyUsed: string = 'USD';
  @Input() unitPrice: string = '1';
  @Input() unitDiscountedPrice: string | null = null;
  @Input() productDetail: string;
  @Input() minimumOrder: number = 1;
  @Input() selectedQuantity: number = 1;
  @Input() countryName: string = '';
  @Input() countryFlag: string = '';
  @Input() countryCode: string = '';
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
  price: any = parseFloat(this.unitPrice);
  discountedPrice: any = parseFloat(
    this.unitDiscountedPrice ? this.unitDiscountedPrice : '1'
  );

  floatPrice: string = this.price.toPrecision(4);
  floatDiscountedPrice: string = this.discountedPrice.toPrecision(4);

  constructor() {}

  ngOnInit(): void {
    this.price = parseFloat(this.unitPrice);
    this.discountedPrice = parseFloat(
      this.unitDiscountedPrice ? this.unitDiscountedPrice : '1'
    );

    this.floatPrice = this.price.toPrecision(4);
    this.floatDiscountedPrice = this.discountedPrice.toPrecision(4);
  }

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
    // if (quantity <= 0) return;
    // this.price = this.unitPrice * quantity;
    // this.discountedPrice = this.unitDiscountedPrice * quantity;
    // this.numberToFloat();
  }
}
