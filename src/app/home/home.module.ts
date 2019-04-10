import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, DialogHomeComponent } from './home.component';
import { AngularMaterialModule } from '../angular-material/angular.material.module';

@NgModule({
  declarations: [HomeComponent, DialogHomeComponent],
  entryComponents: [DialogHomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
