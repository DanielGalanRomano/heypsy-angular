import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { AngularMaterialModule } from '../angular-material/angular.material.module';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class TermsAndConditionsModule { }
