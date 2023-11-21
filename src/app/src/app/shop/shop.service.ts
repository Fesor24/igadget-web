import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SearchParams from '../shared/models/searchparams.model';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  baseUrl = 'http://localhost:6001/'

  constructor(private httpClient: HttpClient) { }

  searchProducts(params: SearchParams){
    return this.httpClient.get(this.baseUrl + `search?pageSize=${params.pageSize}
    &pageNumber=${params.pageNumber}&searchTerm=${params.searchTerm}&sortBy=${params.sortBy}
    &sortDirection=${params.sortDirection}&yearOfReleaseStart=${params.yearOfReleaseStart}&
    yearOfReleaseEnd=${params.yearOfReleaseEnd}&minimumPrice=${params.minimumPrice}&
    maximumPrice=${params.maximumPrice}&`)
  }
}
