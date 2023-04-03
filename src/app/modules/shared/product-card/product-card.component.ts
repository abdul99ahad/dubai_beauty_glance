import { Component, Input } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { map, Observable } from 'rxjs';
import { ProductDetail } from 'src/app/interfaces/product.interface';
import { WebApiService } from 'src/app/services/web-api.service';
import { ProductCartItem } from 'src/app/utilities/productCartItem';
import { CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('name') name: string;
  @Input('slug') slug: string;
  @Input('price') price: string;
  @Input('discount_price') discount_price: string | null;
  @Input('image') image: string;
  @Input('brandName') brandName: string;

  public readonly currency: string;
  public productDetail: ProductDetail;

  public constructor(
    private readonly currencyService: CurrencyService,
    private cartService: CartService<ProductCartItem>,
    private webApiService: WebApiService
  ) {
    this.currency = this.currencyService.selectedCurrency;
  }

  public getProductDetail(): Observable<ProductDetail> {
    return this.webApiService
      .getProductDetails(this.slug)
      .pipe(map((response: { data: ProductDetail }) => response.data));
  }

  public AddtoCart() {
    // If already exists, increase the quantity
    this.getProductDetail().subscribe((detail) => {
      // this.productDetail = detail;
      if (this.cartService.getItem(detail.sku)) {
        const product = this.cartService.getItem(detail.sku);
        product.setQuantity(product.quantity + detail.min_order_quantity);
      } else {
        this.cartService.addItem(
          new ProductCartItem({
            id: detail.sku,
            name: detail.name,
            image: this.image,
            price: this.price,
            quantity: detail.min_order_quantity,
            discount_price: this.discount_price,
            min_quantity: detail.min_order_quantity,
          })
        );
      }
    });
  }
}
