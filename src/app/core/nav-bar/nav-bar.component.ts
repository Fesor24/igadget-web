import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { CartService } from 'src/app/cart/cart.service';
import { IShoppingCart, ShoppingCart } from 'src/app/shared/models/cart.model';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cart$!: Observable<IShoppingCart | null>

  user$!: Observable<IUser>

  constructor(private cartService: CartService,
    private accountService: AccountService){}

  ngOnInit(): void {
    this.getCart();
    this.getUser();
  }

  getCart(){
    this.cart$ = this.cartService.cart$;
  }

  login(){
    this.accountService.login();
  }

  logout(){
    this.accountService.logout();
  }

  getUser(){
    this.user$ = this.accountService.user$;
  }

}
