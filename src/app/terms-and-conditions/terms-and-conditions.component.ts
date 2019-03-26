import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
  }

  public acceptTermsAndConditions() {
    console.log(`${TermsAndConditionsComponent.name}::acceptTermsAndConditions`);
    this.manager.setTermsAndConditionsValue(true);
    this.router.navigate(['/problem-form']);
  }

}
