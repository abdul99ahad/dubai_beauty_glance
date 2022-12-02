import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-textbox',
  templateUrl: './input-textbox.component.html',
  styleUrls: ['./input-textbox.component.scss'],
})
export class InputTextboxComponent implements OnInit {
  @Input('type') type: string = '';
  @Input('placeholder') placeholder: string = '';
  constructor() {}

  ngOnInit(): void {}
}
