import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ShopModule { }
