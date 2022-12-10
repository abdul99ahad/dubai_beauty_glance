import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
})
export class AdBannerComponent implements OnInit {
  @Input('adImgUrl') adImgUrl: string =
    'https://jolse.com/web/images/topbanner08552.jpg'; //TODO:
  constructor() {}

  ngOnInit(): void {}
}
