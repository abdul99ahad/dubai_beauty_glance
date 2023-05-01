import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-textbox',
  templateUrl: './input-textbox.component.html',
  styleUrls: ['./input-textbox.component.scss'],
})
export class InputTextboxComponent implements OnInit {
  @Input('type') type: string = '';
  @Input('placeholder') placeholder: string = '';
  @Output() nameChange = new EventEmitter();

  private _name: string;

  @Input()
  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  constructor() {}

  ngOnInit(): void {}

  nameChanging() {
    this.nameChange.emit(this.name);
  }
}
