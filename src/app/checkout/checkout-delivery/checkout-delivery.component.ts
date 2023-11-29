import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethods } from 'src/app/shared/models/delivery.model';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  deliveryMethods: IDeliveryMethods[] = [];

  @Input() checkoutForm!: FormGroup;

  constructor(private checkoutService: CheckoutService, private cartService: CartService){}
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (methods) => (this.deliveryMethods = methods),
      error: (err) => console.log(err),
    });
  }

  setDeliveryCharge(deliveryMethod: IDeliveryMethods){
    this.cartService.setDeliveryCharge(deliveryMethod)
  }

}
