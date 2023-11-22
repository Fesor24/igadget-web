import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import SearchParams from '../shared/models/searchparams.model';
import IBrand from '../shared/models/brand.model';
import ICategory from '../shared/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  categorySelected: string = '';
  brandSelected: string = '';
  searchTerms: any = {};
  searchParams: SearchParams = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: 'Category',
    sortDirection: 'asc',
    searchTerm: '',
    yearOfReleaseEnd: 0,
    yearOfReleaseStart: 0,
    minimumPrice: 0,
    maximumPrice: 0
  };


  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.searchProducts();
    this.getBrands();
    this.getCategories();
  }

  searchProducts() {
    this.shopService.searchProducts(this.searchParams).subscribe({
      next: (res) => console.log(res),
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

  onBrandSelected(value: string){
    this.brandSelected = value;
    this.searchTerms.brand = value;
  }

  onSearch(){
    this.searchParams.searchTerm = `${this.searchTerms?.category}_${this.searchTerms?.brand}`;
    this.searchProducts();
  }

  onReset(){
    this.searchParams.searchTerm = '';
    this.searchParams.minimumPrice = 0;
    this.searchParams.maximumPrice = 0;
    this.searchParams.pageSize = 10;
    this.searchParams.pageNumber = 1;
    this.searchParams.sortBy = 'Category';
    this.searchParams.sortDirection = 'asc';
    this.searchParams.yearOfReleaseEnd = 0;
    this.searchParams.yearOfReleaseStart = 0;
    this.brandSelected = '';
    this.categorySelected = '';

    this.searchProducts();
  }
}
