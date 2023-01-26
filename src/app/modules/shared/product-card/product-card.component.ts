import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('price') price: string = '';
  @Input('discountedPrice') discountedPrice: string = '';
  @Input('imgSrc') imgSrc: string = '';
  @Input('defaultCurrencyCode') defaultCurrencyCode: string = 'PKR';
  @Input('showDetails') showDetails: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
