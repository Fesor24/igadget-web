import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { IShoppingCart } from 'src/app/shared/models/cart.model';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IOrderCreate } from 'src/app/shared/models/order.model';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  cart$!: Observable<IShoppingCart>;
  @Input() checkoutForm!: FormGroup;
  loading: boolean = false;

  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.cart$ = this.cartService.cart$;
  }

  onSubmitOrder(){
    this.loading = true;
    const cart = this.cartService.getCurrentCartValue();
    const orderCreate = this.createOrder(cart);

    this.checkoutService.createOrder(orderCreate).subscribe({
      next: order => {
        if(order){
          this.toastr.success('Order created successfully', 'Order created');
          this.cartService.deleteLocalCart();

          const navigationExtras: NavigationExtras = {state: order}

          this.router.navigate(['/checkout/success'], navigationExtras);
        };
      },
      error: err => {
        this.toastr.error(err);
        console.log(err);
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  private createOrder(cart: IShoppingCart) :IOrderCreate {
    return {
      cartId: cart.id,
      deliveryMethodId: this.checkoutForm.get("deliveryForm")?.get("deliveryMethod")?.value,
      deliveryAddress: this.checkoutForm.get("addressForm")?.value
    }
  }
}
