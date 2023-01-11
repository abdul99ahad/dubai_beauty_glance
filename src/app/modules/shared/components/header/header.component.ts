import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

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

  recentlyViewedItems: MenuItem[];
  display: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.recentlyViewedItems = [
      { label: 'Item 1', icon: 'pi pi-fw pi-plus' },
      { label: 'Item 2', icon: 'pi pi-fw pi-download' },
      { label: 'Item 3', icon: 'pi pi-fw pi-refresh' },
    ];
  }
}
