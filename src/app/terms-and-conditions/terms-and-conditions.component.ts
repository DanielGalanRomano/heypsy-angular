import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { BackbuttonService } from '../backbutton.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private manager: ManagerService,
    private backbuttonService: BackbuttonService) { }

  ngOnInit() {
  }

  public ngOnDestroy() {
    this.backbuttonService.setLasView('/terms-and-conditions');
  }

  /**
   * Accept to terms and conditions.
   */
  public acceptTermsAndConditions() {
    console.log(`${TermsAndConditionsComponent.name}::acceptTermsAndConditions`);
    this.manager.setTermsAndConditionsValue(true);
    this.router.navigate(['/home']);
  }

}
