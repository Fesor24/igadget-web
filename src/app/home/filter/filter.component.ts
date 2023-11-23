import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import IBrand from '../../shared/models/brand.model';
import ICategory from '../../shared/models/category.model';
import SearchParams from '../../shared/models/searchparams.model';
import { ShopService } from '../../shop/shop.service';
import IProduct from 'src/app/shared/models/product.model';
import IPagination from 'src/app/shared/models/pagination.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnChanges {
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  categorySelected: string = '';
  brandSelected: string = '';
  searchTerm: string = '';
  searchTerms: any = {};
  value = 0;
  minimumPrice = 70000;
  maximumPrice = 3000000;
  @Input() pageNumber: number = 1;
  searchParams: SearchParams = {
    pageNumber: this.pageNumber,
    pageSize: 6,
    sortBy: '',
    sortDirection: '',
    searchTerm: '',
    yearOfReleaseEnd: 0,
    yearOfReleaseStart: 0,
    minimumPrice: 0,
    maximumPrice: 0,
  };

  @Output() productEmitter = new EventEmitter<IPagination<IProduct[]>>();

  constructor(private shopService: ShopService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['pageNumber'] && !changes['pageNumber'].firstChange){
      this.searchParams.pageNumber = changes['pageNumber'].currentValue;

      this.searchProducts();
    }

  }

  ngOnInit(): void {
    this.searchProducts();
    this.getBrands();
    this.getCategories();
  }

  searchProducts() {
    this.shopService.searchProducts(this.searchParams).subscribe({
      next: (res) => this.productEmitter.emit(res),
      error: (err) => console.log(err),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (res) => (this.brands = res),
      error: (err) => console.log(err),
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.log(err),
    });
  }

  onCategorySelected(value: string) {
    this.categorySelected = value;
    this.searchTerms.category = value;
  }

  onBrandSelected(value: string) {
    this.brandSelected = value;
    this.searchTerms.brand = value;
  }

  onSearch() {
    const category = this.searchTerms?.category
      ? this.searchTerms?.category
      : '';
    const brand = this.searchTerms?.brand ? this.searchTerms?.brand : '';

    let searchTerm = '';

    if (category.length > 0 && brand.length > 0) {
      searchTerm = `${category}_${brand}`;
    } else if (category.length > 0) {
      searchTerm = category;
    } else if (brand.length > 0) {
      searchTerm = brand;
    } else {
      searchTerm = '';
    }

    this.searchParams.searchTerm = searchTerm;
    this.searchParams.minimumPrice = 0;
    this.searchParams.maximumPrice = this.value;
    this.searchProducts();
  }

  onReset() {
    this.searchParams.searchTerm = '';
    this.searchParams.minimumPrice = 0;
    this.searchParams.maximumPrice = 0;
    this.searchParams.pageSize = 6;
    this.searchParams.pageNumber = 1;
    this.searchParams.sortBy = '';
    this.searchParams.sortDirection = '';
    this.searchParams.yearOfReleaseEnd = 0;
    this.searchParams.yearOfReleaseStart = 0;
    this.brandSelected = '';
    this.categorySelected = '';
    this.value = 0;

    this.searchProducts();
  }
}
