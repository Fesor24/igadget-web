import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import IProduct from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: IProduct;

  constructor(private cartService: CartService){}

  addItemsToCart(){
    this.cartService.addItemToCart(this.product);
  }
}
