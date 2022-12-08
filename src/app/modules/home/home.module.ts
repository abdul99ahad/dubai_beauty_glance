import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTimedealComponent } from './main-timedeal/main-timedeal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainTimedealComponent],
  imports: [CommonModule, SharedModule],
  exports: [MainTimedealComponent],
})
export class HomeModule {}
