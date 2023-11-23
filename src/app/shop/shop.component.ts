import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

productId: string = '';

  ngOnInit(): void {
    this.getProduct();
  }

  constructor(private activatedRoute: ActivatedRoute){}

  getProduct(){
    this.activatedRoute.params.subscribe({
      next: (params: Params) => this.productId = params['id'],
      error: (err) => console.log(err)
    })
  }

}
