import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { IShoppingCart, IShoppingCartTotals } from '../shared/models/cart.model';
import { IShoppingCartItem } from '../shared/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {

  cart$!: Observable<IShoppingCart | null>;
  cartTotal$!: Observable<IShoppingCartTotals>;

  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.getCart();
    this.getCartTotals();
  }

  getCart(){
    this.cart$ = this.cartService.cart$;
  }

  getCartTotals(){
    this.cartTotal$ = this.cartService.cartTotal$
  }

  incrementCartItem(item: IShoppingCartItem){
    this.cartService.incrementItem(item);
  }

  decrementCartItem(item: IShoppingCartItem){
    this.cartService.decrementItem(item);
  }

  removeCartItem(item: IShoppingCartItem){
    this.cartService.removeItem(item);
  }

}
