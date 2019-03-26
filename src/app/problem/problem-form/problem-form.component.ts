import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service';
import { Person } from 'src/app/entities/person';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ProblemFormComponent implements OnInit {

  public problem: string = '';
  public username: string = '';
  public adviceOption: boolean = true;
  public termsAndConditionsOption: boolean = false;

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
    this.termsAndConditionsOption = this.manager.getTermsAndConditionsValue();
  }

  /**
   * sendProblem
   */
  public sendProblem() {
    console.log(`${ProblemFormComponent.name}::sendProblem username %o , message %o`, this.username, this.problem);
    const requester: Person = {
      name: this.username
    };

    this.manager.createProblem(this.problem, requester);
    this.router.navigate(['/conversation']);
  }

  /**
   * goToTermsAndConditions
   */
  public goToTermsAndConditions() {
    console.log(`${ProblemFormComponent.name}::goToTermsAndConditions`);

    this.router.navigate(['/terms-and-conditions']);
  }

  /**
   * isFormComplete
   */
  public isFormComplete() {
    return this.username !== '' && this.problem !== '' && this.termsAndConditionsOption;
  }
}
