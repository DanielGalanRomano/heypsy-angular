import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceComponent } from './advice.component';
import { AngularMaterialModule } from '../angular-material/angular.material.module';

@NgModule({
  declarations: [AdviceComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class AdviceModule { }
