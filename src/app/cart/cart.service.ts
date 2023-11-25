import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IShoppingCart, ShoppingCart } from '../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.apiUrl;

  private cartSource = new BehaviorSubject<IShoppingCart>(new ShoppingCart());

  cart$ = this.cartSource.asObservable();

  constructor(private httpClient: HttpClient) { }


}
