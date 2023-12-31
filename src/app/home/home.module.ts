import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsComponent } from './products/products.component';
import { FilterComponent } from './filter/filter.component';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    FilterItemComponent,
    FilterComponent,
    ProductItemComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SliderModule,
    PaginatorModule,
    RouterModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
