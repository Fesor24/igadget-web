import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SearchParams from '../shared/models/searchparams.model';
import ICategory from '../shared/models/category.model';
import IBrand from '../shared/models/brand.model';
import IPagination from '../shared/models/pagination.model';
import IProduct from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  baseUrl = 'http://localhost:6001/'

  constructor(private httpClient: HttpClient) { }

  searchProducts(searchParam: SearchParams){

    let params = new HttpParams();

    params = params.set('pageSize', searchParam.pageSize);
    params = params.set('pageNumber', searchParam.pageNumber);
    params = params.set('searchTerm', searchParam.searchTerm);
    params = params.set('sortBy', searchParam.sortBy);
    params = params.set('sortDirection', searchParam.sortDirection);
    params = params.set('yearOfReleaseStart', searchParam.yearOfReleaseStart);
    params = params.set('yearOfReleaseEnd', searchParam.yearOfReleaseEnd);
    params = params.set('minimumPrice', searchParam.minimumPrice);
    params = params.set('maximumPrice', searchParam.maximumPrice);

    return this.httpClient.get<IPagination<IProduct[]>>(
      this.baseUrl + 'search', {params});
  }

  getBrands(){
    return this.httpClient.get<IBrand[]>(this.baseUrl + 'brands');
  }

  getCategories(){
    return this.httpClient.get<ICategory[]>(this.baseUrl + 'categories');
  }
}
