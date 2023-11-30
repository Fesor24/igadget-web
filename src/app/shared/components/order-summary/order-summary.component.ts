import { Component, Input } from '@angular/core';
import { IShoppingCartTotals } from '../../models/cart.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
@Input() cartTotals!: IShoppingCartTotals;
@Input() btnText!: string;
@Input() showBtn!: boolean;

}
