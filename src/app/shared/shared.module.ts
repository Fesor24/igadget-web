import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OrderSummaryComponent
  ]
})
export class SharedModule { }
