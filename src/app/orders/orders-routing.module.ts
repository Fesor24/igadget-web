import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path: '', component: OrdersComponent},
  {path: ':id', component: OrderComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule { }
