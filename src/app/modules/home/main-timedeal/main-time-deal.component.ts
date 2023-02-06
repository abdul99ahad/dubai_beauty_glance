import { Component } from '@angular/core';
import { Product } from "../../../interfaces/product.interface";

@Component({
  selector: 'app-main-time-deal',
  templateUrl: './main-time-deal.component.html',
  styleUrls: ['./main-time-deal.component.scss'],
})
export class MainTimeDealComponent {
  products: Array<Product> = new Array<Product>(5).fill(
    {
      name: 'MISSHA',
      slug: 'missha',
      price: '22,000',
      discount_price: '18,000',
      image: '../../../../../assets/product_1.jpg',
    },
  );
}
