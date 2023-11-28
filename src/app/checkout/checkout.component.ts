import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { IShoppingCartTotals } from '../shared/models/cart.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartTotal$!: Observable<IShoppingCartTotals>;
  checkoutForm!: FormGroup;

  constructor(private cartService: CartService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCartTotals();
    this.createCheckoutForm();
  }

  getCartTotals() {
    this.cartTotal$ = this.cartService.cartTotal$;
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
    });
  }
}
