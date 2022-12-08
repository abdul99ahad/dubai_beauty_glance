import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-timedeal',
  templateUrl: './main-timedeal.component.html',
  styleUrls: ['./main-timedeal.component.scss'],
})
export class MainTimedealComponent implements OnInit {
  products: any = [
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../assets/product_1.jpg',
    },
    {
      title: 'COSRX',
      description: 'COSRX ADVANCED SNAIL 92 ALL IN ONE CREAM 100ml',
      price: '10,000',
      discountedPrice: '8,000',
      imgSrc: '../assets/product.jpg',
    },
    {
      title: 'MISSHA',
      description:
        'MISSHA All-around Safe Block Soft Finish Sun Milk SPF50+ PA+++ 70ml',
      price: '22,000',
      discountedPrice: '18,000',
      imgSrc: '../assets/product_1.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
