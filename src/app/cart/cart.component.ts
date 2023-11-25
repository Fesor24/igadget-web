import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { IShoppingCart, IShoppingCartTotals } from '../shared/models/cart.model';

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

  // incrementCartItem(item){
  //   this.cartService.addItemToCart()
  // }

}
