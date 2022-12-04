import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dubai_beauty_glance';

  navBarItemList: string[] = [
    'NEW',
    'BEST',
    'TIME DEAL',
    'PROMOTION',
    'BRAND',
    'COUPON',
  ];
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
