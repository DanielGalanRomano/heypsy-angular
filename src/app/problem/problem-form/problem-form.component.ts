import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';

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
  public adviceOption: boolean = false;
  public termsAndConditionsOption: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * sendProblem
   */
  public sendProblem() {
    console.log(`${ProblemFormComponent.name}::sendProblem username %o , message %o`, this.username, this.problem);

  }

  /**
   * goToTermsAndConditions
   */
  public goToTermsAndConditions() {
    console.log(`${ProblemFormComponent.name}::goToTermsAndConditions`);

    this.router.navigate(['/terms-and-conditions']);
  }

}
