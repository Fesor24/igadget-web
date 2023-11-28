import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { IShoppingCartTotals } from '../shared/models/cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartTotal$!: Observable<IShoppingCartTotals>;

  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.getCartTotals();
  }


  getCartTotals(){
    this.cartTotal$ = this.cartService.cartTotal$;
  }

}
