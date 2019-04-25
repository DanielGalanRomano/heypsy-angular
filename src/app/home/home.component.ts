import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service';
import { FirebaseService } from '../firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BackbuttonService } from '../backbutton.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public problem: string = '';
  public username: string = '';
  public adviceOption: boolean = true;
  public termsAndConditionsOption: boolean = false;
  public showAllOptions: boolean = false;

  constructor(
    private router: Router,
    private manager: ManagerService,
    public dialog: MatDialog,
    private firebase: FirebaseService,
    private backbuttonService: BackbuttonService) { }

  ngOnInit() {
    this.termsAndConditionsOption = this.manager.getTermsAndConditionsValue();

    try {
      this.firebase.initFirebase();
    } catch (error) {

    }
  }

  /**
   * sendProblem
   */
  public sendProblem() {
    console.log(`${HomeComponent.name}::sendProblem username %o , message %o`, this.username, this.problem);
    const problemExist: boolean = this.manager.hasRequestInProcess();
    if (problemExist) {
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

  /**
   * Open the terms and condition dialog.
   */
  public openTermsAndConditionsDialog() {
    this.dialog.open(DialogHomeComponent);
  }

  /**
   * Open the hour dialog.
   */
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

  public ngOnDestroy() {
    this.backbuttonService.setLasView('/home');
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
