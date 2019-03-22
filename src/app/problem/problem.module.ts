import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from './problem.component';
import { AngularMaterialModule } from '../angular-material/angular.material.module';

@NgModule({
  declarations: [ProblemComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ProblemModule { }
