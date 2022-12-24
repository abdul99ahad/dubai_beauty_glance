import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navBarItemList: any = [
    { page: 'NEW', url: 'products' },
    { page: 'BEST', url: 'products' },
    { page: 'TIME DEAL', url: 'products' },
    { page: 'PROMOTIONS', url: 'promotions' },
    { page: 'BRAND', url: 'products' },
    { page: 'COUPON', url: 'products' },
  ];

  display: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
