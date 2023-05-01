import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { Cost } from 'src/app/interfaces/cost.interface';
import { WishListService } from 'src/app/services/wishlist.service';
import { ProductCartItem } from 'src/app/utilities/productCartItem';
import { CurrencyService } from '../../../../services/currency.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  // cartList: any = [
  //   {
  //     id: 123,
  //     productDetail: 'Beauty of joseon Relief Sun Rice Probiotics 50ml',
  //     unitPrice: 11.49,
  //     price: 11.49,
  //     quantity: 1,
  //     total: 11.49,
  //     imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
  //   },
  //   {
  //     id: 234,
  //     productDetail: 'Ala Bala Item 50ml',
  //     unitPrice: 19.49,
  //     price: 19.49,
  //     quantity: 1,
  //     total: 19.49,
  //     imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
  //   },
  //   {
  //     id: 393,
  //     productDetail: 'Spponn dfosdu sdlsfd',
  //     unitPrice: 20.0,
  //     price: 60.0,
  //     quantity: 3,
  //     total: 60.0,
  //     imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
  //   },
  // ]; // TODO: Interface and API

  cartList: ProductCartItem[];
  // totalAmount: any = [
  //   {
  //     amount: 120.0,
  //     discountAmount: 18.0,
  //     totalAmount: 102.0,
  //   },
  // ];
  totalProductItemsCount: number;
  public readonly currency: string;
  public cost: Cost = {
    amount: 0,
    totalAmount: 0,
    discountAmount: 0,
  };

  public constructor(
    private readonly currencyService: CurrencyService,
    private wishListService: WishListService<ProductCartItem>
  ) {
    this.currency = this.currencyService.selectedCurrency;
  }

  ngOnInit(): void {
    this.updateCartItems();
    console.log(this.wishListService.getItems()); // <-- works
  }

  deleteItemFromWishList(item: ProductCartItem): void {
    this.wishListService.deleteItem(item);
    this.updateCartItems();
  }

  updateItem(item: ProductCartItem): void {
    item.setQuantity(item.quantity);
    item.updateTotalPrice(item.quantity);
    this.updateCartItems();
  }

  // emptyCart(): void {
  //   this.wishListService.clear();
  //   this.updateCartItems();
  // }

  // calculateTotalBill(): void {
  //   let totalPrice: number = 0;
  //   this.cartList.forEach((element: any) => {
  //     totalPrice += element.price;
  //     totalPrice.toPrecision(2);
  //   });
  //   this.totalAmount[0].amount = totalPrice;
  //   this.totalAmount[0].totalAmount =
  //     this.totalAmount[0].amount - this.totalAmount[0].discountAmount;
  // }

  costCalculation(): void {
    this.cost = {
      amount: 0,
      totalAmount: 0,
      discountAmount: 0,
    };
    this.cartList.forEach((item) => {
      this.cost.amount += item.price * item.quantity;
      this.cost.discountAmount +=
        (item.price - item.discount_price) * item.quantity;
      this.cost.totalAmount += item.discount_price * item.quantity;
    });

    this.cost.amount = parseFloat(this.cost.amount.toFixed(2));
    this.cost.discountAmount = parseFloat(this.cost.discountAmount.toFixed(2));
    this.cost.totalAmount = parseFloat(this.cost.totalAmount.toFixed(2));
  }

  private updateCartItems(): void {
    this.cartList = this.wishListService.getItems();
    console.log(this.cartList);
    this.totalProductItemsCount = this.wishListService.itemCount();
    this.costCalculation();
  }
}
