import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextboxComponent } from './input-textbox/input-textbox.component';
import { InputButtonComponent } from './input-button/input-button.component';

@NgModule({
  declarations: [InputTextboxComponent, InputButtonComponent],
  imports: [CommonModule, InputTextModule, ButtonModule],
  exports: [
    InputTextModule,
    ButtonModule,
    InputTextboxComponent,
    InputButtonComponent,
  ],
})
export class SharedModule {}
