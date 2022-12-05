import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-menu',
  templateUrl: './quick-menu.component.html',
  styleUrls: ['./quick-menu.component.scss'],
})
export class QuickMenuComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('imageUrlOn') imageUrlOn: string = '';
  @Input('imageUrlOff') imageUrlOff: string = '';
  @Input('redirectUrl') redirectUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
