import { Component, OnInit, Inject } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service';
import { Person } from 'src/app/entities/person';
import { FirebaseService } from '../firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    public dialog: MatDialog,
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
    const validationHours: boolean = this.manager.hasRequestInProcess();
    if (validationHours) {
      this.openHourValidationDialog();
    } else if (!this.termsAndConditionsOption) {
      this.openTermsAndConditionsDialog();
    } else {
      this.manager.sendProblem(this.problem, this.username);
      this.router.navigate(['/conversation/requester/0']);
    }
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
    if (!this.termsAndConditionsOption) {
      this.openTermsAndConditionsDialog();
    } else {
      this.router.navigate(['/advice']);
    }
  }

  public openTermsAndConditionsDialog() {
    this.dialog.open(DialogHomeComponent);
  }
  public openHourValidationDialog() {
    this.dialog.open(DialogHourValidationComponent);
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


@Component({
  selector: 'app-home-dialog',
  templateUrl: 'home-dialog.html',
})
export class DialogHomeComponent {
  constructor(public dialogRef: MatDialogRef<DialogHomeComponent>) { }

  okClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-hour-validation-dialog',
  templateUrl: 'hour-validation-dialog.html',
})
export class DialogHourValidationComponent {
  constructor(public dialogRef: MatDialogRef<DialogHourValidationComponent>) { }

  okClick(): void {
    this.dialogRef.close();
  }
}
