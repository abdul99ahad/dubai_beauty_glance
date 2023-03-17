import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-main-time-deal',
  templateUrl: './main-time-deal.component.html',
  styleUrls: ['./main-time-deal.component.scss'],
})
export class MainTimeDealComponent {
  products: Array<Product> = new Array<Product>(5).fill({
    name: 'MISSHA',
    slug: 'missha',
    price: '22,000',
    discount_price: '18,000',
    image: '../../../../../assets/product_1.jpg',
    brand: {
      name: 'Brand 025 - 0003',
      slug: 'brand-025-0003',
      country_name: 'Bolivia',
      country_code: 'bo',
      country_flag: 'countries/images/bo.svg',
      brand_image: 'images/brand.png',
      brand_banner_image: 'images/brandbanner.jpg',
    },
  });
}
