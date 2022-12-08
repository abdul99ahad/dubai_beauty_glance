import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTimedealComponent } from './modules/home/main-timedeal/main-timedeal.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
