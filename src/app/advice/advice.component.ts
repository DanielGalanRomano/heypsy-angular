import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { Problem } from '../entities/problem';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { BackbuttonService } from '../backbutton.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AdviceComponent implements OnInit, OnDestroy {

  public problemList: Problem[] = [];
  public dateReference: moment.Moment;
  public render: Date;
  public currentUser: User = null;
  public currentProblem: Problem = null;
  private timerReference$: Subscription = null;
  private problemListSubscription$: Subscription = null;
  private getProblemById$: Subscription = null;
  public answersCount: number = 0;
  private setIntervalReference = null;

  constructor(
    private router: Router,
    private manager: ManagerService,
    private backbuttonService: BackbuttonService) {
    this.currentUser = this.manager.getUserData();
    this.currentProblem = this.manager.getCurrentProblem();
  }

  ngOnInit() {

    if (this.currentUser !== null && this.currentProblem !== null) {
      this.problemListSubscription$ = this.manager.getProblems$()
        .pipe(
          map(response => response.filter((item: any) => {
            return this.currentProblem.id !== item.id;
          }))
        )
        .subscribe((problemList: Problem[]) => {
          this.removeAllProblems(problemList);
          const newList = problemList.filter((item) => !this.check24Hours(item) && item.idRequester !== this.currentUser.id);
          this.problemList = newList.filter((item) => this.getExpirationDinamyDate(item.expirationDate) !== '0 minutos');
          if (this.problemList.length > 0) {
            this.initCountdown();
          }
        });
    } else {
      this.problemListSubscription$ = this.manager.getProblems$()
        .subscribe((problemList: Problem[]) => {
          this.removeAllProblems(problemList);
          const newList = problemList.filter((item) => !this.check24Hours(item));
          this.problemList = newList.filter((item) => this.getExpirationDinamyDate(item.expirationDate) !== '0 minutos');
          if (this.problemList.length > 0) {
            this.initCountdown();
          }
        });
    }
    if (this.currentUser !== null) {
      this.getProblemById$ = this.manager.getProblemById$().pipe(
        map(response => response.filter((item: any) => {
          return item.id !== undefined && item.id === this.currentProblem.id;
        }))
      )
        .subscribe((problem: any) => {
          this.answersCount = problem[0].answers;
        });
    }

    if (this.problemList.length > 0) {
      this.initCountdown();
    }
  }

  ngOnDestroy() {
    if (this.timerReference$ !== null &&
      this.problemListSubscription$ !== null) {
      this.timerReference$.unsubscribe();
      this.getProblemById$.unsubscribe();
      this.problemListSubscription$.unsubscribe();
    }

    clearInterval(this.setIntervalReference);

    this.backbuttonService.setLasView('/advice');
  }

  private check24Hours(problem: Problem) {
    const now = moment();
    const dateReference = moment(problem.expirationDate, 'DD/MM/YYYY HH:mm:ss');
    const hoursDiff: number = now.diff(dateReference, 'hours');

    return Math.abs(hoursDiff) > 24;
  }

  public goTo(problem: Problem) {
    const id: number = <any>problem.id;
    if (this.problemIsAssistedByMe(problem)) {
      this.goToConversation(id);
    } else {
      this.goToAdviceForm(id);
    }
  }

  /**
   * Redirect to home view.
   */
  public goToHome() {
    console.log(`${AdviceComponent.name}::goToHome`);
    this.router.navigate(['/home']);
  }

  /**
   * Redirect to advice view.
   */
  public goToAdviceForm(id: number) {
    console.log(`${AdviceComponent.name}::goToAdviceForm`);
    this.router.navigate([`/advice-form/${id}`]);
  }

  /**
   * Redirect to conversation view.
   */
  public goToConversation(id: number) {
    console.log(`${AdviceComponent.name}::goToConversation`);
    this.router.navigate([`/conversation/requester/${id}`]);
  }

  /**
   * Init countDown.
   */
  public initCountdown() {

    this.setIntervalReference = setInterval(() => {
      this.problemList
        .forEach((item) => {
          item.expirationValue = this.getExpirationValue(item.expirationDate) * 100 / 24;
          item.expirationDinamyDate = this.getExpirationDinamyDate(item.expirationDate);
        });
    },
      1000);
  }

  /**
   * Return de expiration value.
   */
  public getExpirationValue(exDate): number {
    const expirationDate = moment(exDate, 'DD/MM/YYYY HH:mm:ss');
    const hoursDiff: number = expirationDate.diff(moment(), 'hours');
    return hoursDiff;
  }

  /**
   * Return de sxpiration Dinmany date.
   */
  public getExpirationDinamyDate(exDate) {
    const expirationDate = moment(exDate, 'DD/MM/YYYY HH:mm:ss');
    const hours = expirationDate.diff(moment(), 'hours');
    const minutes = expirationDate.diff(moment(), 'minutes');
    return hours > 1 ? `${hours} horas` : minutes > 0 ? `${minutes} minutos` : `${0} minutos`;
  }

  /**
   * Evaluate if the problem is assisted by me.
   */
  public problemIsAssistedByMe(problem: Problem) {
    return this.currentUser !== null && problem.assistedByArr.length > 0 && problem.assistedByArr.indexOf(this.currentUser.id) > -1;
  }

  /**
   * getTextProblem
   */
  public getTextProblem(message: string) {
    const messageFormated: string = message.length > 100 ? `${message.slice(0, 97)}...` : message;
    return messageFormated;
  }

  /**
   * Remove all problems with 24hrs.
   */
  private removeAllProblems(problemList: Problem[]) {
    problemList
      .forEach((item) => {
        const isValid: boolean = this.checkValidationHours(item.scheduleDate);
        if (!isValid) {
          this.manager.deleteProblem(item.id);
        }
      });
  }

  /**
   * Check validation hours.
   */
  private checkValidationHours(scheduleDate: string): boolean {
    let diff = 0;
    if (this.currentProblem !== null && scheduleDate !== undefined) {
      const now = moment().minutes(0).seconds(0);
      const dateToCompare = moment(scheduleDate, 'DD/MM/YYYY HH:mm:ss');
      diff = now.diff(dateToCompare, 'hours');
    }

    return diff < 24;
  }
}
