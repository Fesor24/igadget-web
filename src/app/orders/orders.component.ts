import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { IOrder } from '../shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[] = [];

  constructor(private ordersService: OrdersService){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.ordersService.getOrders().subscribe({
      next: order => {
        if(order !== null){
          this.orders = order;
          console.log(order);
        }
      }
    })
  }

  clickEv(){
    console.log("I was");
  }

}
