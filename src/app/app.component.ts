import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IGadget';

  constructor(private cartService: CartService, private oidcService: OidcSecurityService,
    private httpClient: HttpClient) {}

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

  checkAuthStatus(){
    this.oidcService.checkAuth().subscribe({
      next: (response: LoginResponse) => {
        if(response.isAuthenticated){
          console.log(response);
          let httpHeaders = new HttpHeaders();

          httpHeaders = httpHeaders.set('Authorization', `Bearer ${response.accessToken}`)

          this.httpClient.get('http://localhost:5000/connect/userinfo', {headers: httpHeaders})
          .subscribe({
            next: res => console.log(res),
            error: err => console.log(err)
          });

        }
      },
      error: err => console.log(err)
    })
  }
}
