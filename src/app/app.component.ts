import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dubai_beauty_glance';

  navBarItemList: any = [
    { page: 'NEW', url: 'products' },
    { page: 'BEST', url: 'products' },
    { page: 'TIME DEAL', url: 'products' },
    { page: 'PROMOTIONS', url: 'promotions' },
    { page: 'BRAND', url: 'products' },
    { page: 'COUPON', url: 'products' },
  ];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
