import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss'],
})
export class BrandCardComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('brandSlug') brandSlug: string = '';
  @Input('discountedPrice') discountedPrice: string = '';
  @Input('imgSrc') imgSrc: string = '';
  @Input('showDetails') showDetails: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
