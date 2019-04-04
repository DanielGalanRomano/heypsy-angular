import { Component, OnInit, Inject } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service';
import { Person } from 'src/app/entities/person';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class HomeComponent implements OnInit {

  public problem: string = '';
  public username: string = '';
  public adviceOption: boolean = true;
  public termsAndConditionsOption: boolean = false;
  public showAllOptions: boolean = false;

  constructor(
    private router: Router,
    private manager: ManagerService,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.termsAndConditionsOption = this.manager.getTermsAndConditionsValue();
    this.firebase.initFirebase();
  }

  /**
   * sendProblem
   */
  public sendProblem() {
    console.log(`${HomeComponent.name}::sendProblem username %o , message %o`, this.username, this.problem);

    this.manager.sendProblem(this.problem, this.username);
    this.router.navigate(['/conversation/requester']);
  }

  /**
   * goToTermsAndConditions
   */
  public goToTermsAndConditions() {
    console.log(`${HomeComponent.name}::goToTermsAndConditions`);

    this.router.navigate(['/terms-and-conditions']);
  }

  /**
   * goToAdvice
   */
  public goToAdvice() {
    console.log(`${HomeComponent.name}::goToAdvice`);

    this.router.navigate(['/advice']);
  }

  /**
   * isFormComplete
   */
  public isFormComplete() {
    return this.username !== '' && this.problem !== '' && this.termsAndConditionsOption;
  }

  /**
   * isProblemDefine
   */
  public isProblemDefine() {
    return this.problem !== '';
  }

  /**
   * activateAllOptions
   */
  public activateAllOptions() {
    return this.showAllOptions = true;
  }
}

