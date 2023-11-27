import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IGadget';

  constructor(private cartService: CartService, private accountService: AccountService) {}

    userData: any = {};

  ngOnInit(): void {
    this.getCart();
    this.checkAuthStatus();
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

  checkAuthStatus() {
    this.accountService.checkAuthStatus().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })
}

}
