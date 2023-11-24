import { ResolveFn } from '@angular/router';
import IProduct from '../shared/models/product.model';
import { inject } from '@angular/core';
import { ShopService } from './shop.service';
import { Observable } from 'rxjs';

export const productResolver: ResolveFn<IProduct> = (route, state) : Observable<IProduct> => {
  const productId = route.paramMap.get('id');

  return inject(ShopService).getProduct(productId);
};
