import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import IProduct from '../shared/models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

productId: string = '';
quantity = 1;

product!: IProduct;

  ngOnInit(): void {
    this.getProduct();
  }

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService){}

  getProduct(){
    this.activatedRoute.data.subscribe({
      next: (data: Data) => this.product = data['product'],
      error: (err) => console.log(err)
    })
  }

  addItemToCart(){
    this.cartService.addItemToCart(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }

}
