import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  title: string = 'CART';
  cartList: any = [
    {
      id: 123,
      productDetail: 'Beauty of joseon Relief Sun Rice Probiotics 50ml',
      price: 11.49,
      quantity: 1,
      total: 11.49,
    },
    {
      id: 234,
      productDetail: 'Ala Bala Item 50ml',
      price: 19.49,
      quantity: 1,
      total: 19.49,
    },
    {
      id: 393,
      productDetail: 'Spponn dfosdu sdlsfd',
      price: 118.49,
      quantity: 3,
      total: 118.49,
    },
  ]; // TODO: Interface and API
  currencyUsed: string = 'USD';
  totalProductItemsCount: number = this.cartList.length;
  constructor() {}

  ngOnInit(): void {}

  deleteItemFromCart(item: any) {
    const index = this.cartList.indexOf(item);
    this.cartList.splice(index, 1);
    this.totalProductItemsCount = this.cartList.length;
  }
}
