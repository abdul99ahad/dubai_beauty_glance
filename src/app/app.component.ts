import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {WebApiService} from "./services/web-api.service";
import {map, Subscription} from "rxjs";
import {Setting} from "./interfaces/setting.interface";
import {CurrencyService} from "./services/currency.service";
import {BaseComponent} from "./base/base.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  title = 'dubai_beauty_glance';
  display: boolean = false;

  public setting: Setting;
  response: boolean = false;

  navBarItemList: any = [
    {page: 'NEW', url: 'products'},
    {page: 'BEST', url: 'products'},
    {page: 'TIME DEAL', url: 'products'},
    {page: 'PROMOTIONS', url: 'promotions'},
    {page: 'BRAND', url: 'products'},
    {page: 'COUPON', url: 'products'},
  ];

  constructor(private readonly currencyService: CurrencyService, private primengConfig: PrimeNGConfig, private readonly webApiService: WebApiService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(this.getSetting());
    this.primengConfig.ripple = true;
  }

  getSetting(): Subscription {
    return this.webApiService.getSetting().pipe(
      map(({data}: { data: Setting; }) => data)
    ).subscribe((setting: Setting) => {
        this.setting = setting;
        this.setting.logo = this.webApiService.imgUrl + this.setting.logo;
        this.setting.footer_logo = this.webApiService.imgUrl + this.setting.footer_logo;
        if (!localStorage.getItem("currency"))
          this.currencyService.selectedCurrency = this.setting.currency;
        this.response = true;
      },
      (error) => {
        console.error("Error: ", error)
      }
    );
  }

  ngOnDestroy() {
    this.flushSubscriptions();
  }
}
