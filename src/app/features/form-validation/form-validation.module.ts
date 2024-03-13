import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationComponent } from './form-validation.component';
import { FormValidationRoutingModule } from './form-validation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplacePeriodDirective } from '../../shared/directives/replace-period.directive';

@NgModule({
  imports: [
    CommonModule,
    FormValidationRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormValidationComponent,
    ReplacePeriodDirective
  ]
})
export class FormValidationModule { }
