import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IGadget';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    const cartId = localStorage.getItem('cart_id');

    if(cartId){
      this.cartService.getShoppingCart(cartId).subscribe({
        next: () => console.log('Cart Initialized'),
        error: err => console.log(err)
      });
    }

  }
}
