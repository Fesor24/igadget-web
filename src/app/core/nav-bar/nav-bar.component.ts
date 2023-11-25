import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { IShoppingCart, ShoppingCart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cart$!: Observable<IShoppingCart | null>

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cart$ = this.cartService.cart$;
  }

}
