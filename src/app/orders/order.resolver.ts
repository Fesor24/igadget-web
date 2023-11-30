import { ResolveFn } from '@angular/router';
import { IOrder } from '../shared/models/order.model';
import { Observable } from 'rxjs';
import { OrdersService } from './orders.service';
import { inject } from '@angular/core';

export const orderResolver: ResolveFn<IOrder | null> = (route, state) : Observable<IOrder | null> => {
  const orderId = route.paramMap.get('id');

  return inject(OrdersService).getOrder(orderId as unknown as number);
};
