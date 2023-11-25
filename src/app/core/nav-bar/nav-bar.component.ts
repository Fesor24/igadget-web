import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { IShoppingCart, ShoppingCart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cart: IShoppingCart = new ShoppingCart();

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getCart(){
    const cart = this.cartService.getCurrentCartValue();

    if(cart){
      this.cart = cart;
    }


  }

}
