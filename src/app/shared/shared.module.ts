import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';



@NgModule({
  declarations: [
    OrderSummaryComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkStepperModule
  ],
  exports: [
    OrderSummaryComponent,
    CdkStepperModule,
    StepperComponent
  ]
})
export class SharedModule { }
