import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataViewLayoutOptions } from 'primeng/dataview';
import { Category } from 'src/app/models/categories.model';
import { WebApiService } from 'src/app/services/web-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  expandedState: boolean = false;
  navBarItemList: any = [
    { page: 'NEW', url: 'products' },
    { page: 'BEST', url: 'products' },
    { page: 'TIME DEAL', url: 'products' },
    { page: 'PROMOTIONS', url: 'promotions' },
    { page: 'BRAND', url: 'brands' },
    { page: 'COUPON', url: 'products' },
  ];

  navBarItemListMobile: any = [
    { page: 'NEW', url: 'products' },
    { page: 'BEST', url: 'products' },
    { page: 'TIME DEAL', url: 'products' },
    { page: 'PROMOTIONS', url: 'promotions' },
  ];

  navBarMobileListViewToggle(): void {
    if (this.expandedState) {
      this.navBarItemListMobile = this.navBarItemListMobile.slice(0, 4);
    } else {
      this.navBarItemListMobile = this.navBarItemList;
    }
    this.expandedState = !this.expandedState;
  }

  recentlyViewedItems: MenuItem[];
  display: boolean = false;

  constructor(private webApi: WebApiService) {}

  ngOnInit(): void {
    this.recentlyViewedItems = [
      { label: 'Item 1', icon: 'pi pi-fw pi-plus' },
      { label: 'Item 2', icon: 'pi pi-fw pi-download' },
      { label: 'Item 3', icon: 'pi pi-fw pi-refresh' },
    ];
  }

  categories: Category[] = [];

  getCategories() {
    this.display = true;
    this.webApi.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
}
