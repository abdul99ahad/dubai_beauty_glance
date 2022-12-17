import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  cartList: any = [
    {
      id: 123,
      productDetail: 'Beauty of joseon Relief Sun Rice Probiotics 50ml',
      unitPrice: 11.49,
      price: 11.49,
      quantity: 1,
      total: 11.49,
      imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
    },
    {
      id: 234,
      productDetail: 'Ala Bala Item 50ml',
      unitPrice: 19.49,
      price: 19.49,
      quantity: 1,
      total: 19.49,
      imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
    },
    {
      id: 393,
      productDetail: 'Spponn dfosdu sdlsfd',
      unitPrice: 20.0,
      price: 60.0,
      quantity: 3,
      total: 60.0,
      imgSrc: 'https://d1f6um9xlu8jl4.cloudfront.net/COSRX/cosrx_aloe.jpg',
    },
  ]; // TODO: Interface and API

  totalAmount: any = [
    {
      amount: 120.0,
      discountAmount: 18.0,
      totalAmount: 102.0,
    },
  ];
  currencyUsed: string = 'USD';
  totalProductItemsCount: number = this.cartList.length;
  constructor() {}

  ngOnInit(): void {}

  deleteItemFromCart(item: any) {
    const index = this.cartList.indexOf(item);
    this.cartList.splice(index, 1);
    this.totalProductItemsCount = this.cartList.length;
  }

  quantityUp() {}

  quantityDown() {}

  updatePrice(item: any) {
    item.price = item.quantity * item.unitPrice;
    item.total = item.quantity * item.unitPrice;
    this.calculateTotalBill();
  }

  calculateTotalBill(): void {
    let totalPrice: number = 0;
    this.cartList.forEach((element: any) => {
      totalPrice += element.price;
      totalPrice.toPrecision(2);
    });
    this.totalAmount[0].amount = totalPrice;
    this.totalAmount[0].totalAmount =
      this.totalAmount[0].amount - this.totalAmount[0].discountAmount;
  }
}
