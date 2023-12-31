import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent {
  order!: IOrder;
  myNum = 5;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;

    if(state){
      this.order = state as IOrder;
      const intervalId = setInterval(() => {
        if(this.myNum > 0){
          this.myNum--;
        }else{
          clearInterval(intervalId);
          this.router.navigate([`/orders/${this.order.orderId}`])
        }
      }, 1000);
    }else{
      this.router.navigate(['/']);
    }
  }
}
