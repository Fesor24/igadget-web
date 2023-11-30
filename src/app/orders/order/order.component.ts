import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order!: IOrder

constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.activatedRoute.data.subscribe({
      next: (data: Data) => this.order = data['order'],
      error: err => console.log(err)
    })
  }
}
