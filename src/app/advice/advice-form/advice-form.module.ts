import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviceFormComponent } from './advice-form.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular.material.module';

@NgModule({
  declarations: [AdviceFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class AdviceFormModule { }
