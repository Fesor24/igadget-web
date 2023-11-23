import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import IPagination from 'src/app/shared/models/pagination.model';
import IProduct from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['products'] && !changes['products'].firstChange){
      this.pagingItemEnd = (this.pageSize * this.pageNumber) > this.products.totalCount ?
      this.products.totalCount : this.pageSize * this.pageNumber;
      this.pagingItemStart = (this.pageSize * (this.pageNumber - 1)) + 1;
    }
  }

  @Input() products!: IPagination<IProduct[]>;

  @Output() pageNumberEmitter = new EventEmitter<number>();

  pagingItemStart = 1;

  pagingItemEnd = 6;

  pageSize = 6;

  pageNumber = 1

  onPageChange(event: any){
    this.pageNumber = 1 + event.page;
    this.pageNumberEmitter.emit(this.pageNumber);
  }
}
