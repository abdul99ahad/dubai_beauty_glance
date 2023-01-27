import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brandsale-card',
  templateUrl: './brandsale-card.component.html',
  styleUrls: ['./brandsale-card.component.scss'],
})
export class BrandsaleCardComponent implements OnInit {
  @Input('imgSrc') imgSrc: string =
    'https://jolse.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/f0dbca517d2ddb92f768203f2eba3165.jpg';
  constructor() {}

  ngOnInit(): void {}
}
