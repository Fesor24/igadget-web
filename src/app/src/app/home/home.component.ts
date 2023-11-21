import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import SearchParams from '../shared/models/searchparams.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(){
    const searchparams: SearchParams = {
      pageNumber: 1,
      pageSize: 10,
      searchTerm: '',
      sortBy: 'Category',
      sortDirection: 'asc',
      yearOfReleaseEnd: 0,
      yearOfReleaseStart: 0,
      minimumPrice: 0,
      maximumPrice: 0
    };

    this.shopService.searchProducts(searchparams).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })

  }
}
