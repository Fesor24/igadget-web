import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import IProduct from '../shared/models/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

productId: string = '';

product!: IProduct;

  ngOnInit(): void {
    this.getProduct();
  }

  constructor(private activatedRoute: ActivatedRoute){}

  getProduct(){
    this.activatedRoute.data.subscribe({
      next: (data: Data) => this.product = data['product'],
      error: (err) => console.log(err)
    })
  }

}
