import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';



@NgModule({
  declarations: [
    HomeComponent,
    FilterItemComponent,
    FooterComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SliderModule
  ]
})
export class HomeModule { }
