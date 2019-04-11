import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, DialogHomeComponent, DialogHourValidationComponent } from './home.component';
import { AngularMaterialModule } from '../angular-material/angular.material.module';

@NgModule({
  declarations: [HomeComponent, DialogHomeComponent, DialogHourValidationComponent],
  entryComponents: [DialogHomeComponent, DialogHourValidationComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
