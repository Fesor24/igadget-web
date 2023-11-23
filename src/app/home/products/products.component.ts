import { Component, EventEmitter, Input, Output } from '@angular/core';
import IPagination from 'src/app/shared/models/pagination.model';
import IProduct from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products!: IPagination<IProduct[]>;

  @Output() pageNumberEmitter = new EventEmitter<number>();

  pageSize = 6;

  pageNumber = 1

  onPageChange(event: any){
    this.pageNumber = 1 + event.page;
    this.pageNumberEmitter.emit(this.pageNumber);
  }
}
