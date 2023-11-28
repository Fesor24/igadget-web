import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderSummaryComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkStepperModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderSummaryComponent,
    CdkStepperModule,
    StepperComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
