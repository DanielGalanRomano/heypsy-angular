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
  public adviceOption: boolean = false;
  public termsAndConditionsOption: boolean = false;

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
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
    this.router.navigate(['/home']);
  }

  /**
   * goToTermsAndConditions
   */
  public goToTermsAndConditions() {
    console.log(`${ProblemFormComponent.name}::goToTermsAndConditions`);

    this.router.navigate(['/terms-and-conditions']);
  }

}
