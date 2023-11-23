import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {HttpClientModule} from '@angular/common/http';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
