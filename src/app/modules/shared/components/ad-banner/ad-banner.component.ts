import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
})
export class AdBannerComponent implements OnInit {
  @Input('adImgUrl') adImgUrl: string;
  constructor() {}

  ngOnInit(): void {}
}
