import { Component} from '@angular/core';
import IProduct from '../shared/models/product.model';
import IPagination from '../shared/models/pagination.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

products!: IPagination<IProduct[]>;

pageNumber: number = 1;

  constructor() {}

  getProducts(data: IPagination<IProduct[]>){
    this.products = data;
  }

  getPageNumber(page: number){
    this.pageNumber = page;
  }

}
