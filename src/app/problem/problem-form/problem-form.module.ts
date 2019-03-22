import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemFormComponent } from './problem-form.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular.material.module';

@NgModule({
  declarations: [ProblemFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ProblemFormModule { }
