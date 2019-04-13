import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { Problem } from '../entities/problem';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

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
  public value: number;
  public currentUser = null;
  private timerReference$: Subscription = null;
  private problemListSubscription$: Subscription = null;
  private getProblemById$: Subscription = null;
  public answersCount: number = 0;

  constructor(
    private router: Router,
    private manager: ManagerService) {

    this.currentUser = this.manager.getUserData();
  }

  ngOnInit() {

    if (this.currentUser !== null) {
      this.problemListSubscription$ = this.manager.getProblems$()
        .pipe(
          map(response => response.filter((item: any) => {
            return this.currentUser.problem.id !== item.id;
          }))
        )
        .subscribe((problemList: Problem[]) => {
          this.problemList = problemList;
        });
    } else {
      this.problemListSubscription$ = this.manager.getProblems$()
        .subscribe((problemList: Problem[]) => {
          this.problemList = problemList;
        });
    }
    if (this.currentUser !== null) {
      this.getProblemById$ = this.manager.getProblemById$().pipe(
        map(response => response.filter((item: any) => {
          return item.id !== undefined && item.id === this.currentUser.problem.id;
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
  }

  public goToHome() {
    console.log(`${AdviceComponent.name}::goToHome`);
    this.router.navigate(['/home']);
  }

  public goToAdviceForm(id: number) {
    console.log(`${AdviceComponent.name}::goToAdviceForm`);
    this.router.navigate([`/advice-form/${id}`]);
  }

  public goToConversation(id: number) {
    console.log(`${AdviceComponent.name}::goToConversation`);
    this.router.navigate([`/conversation/requester/${id}`]);
  }

  public initCountdown() {
    // this.dateReference = moment().hours(3).minutes(0).seconds(0);
    // const timer$ = interval(1000);

    // this.timerReference$ = timer$.subscribe((v) => {
    //   this.dateReference = this.dateReference.subtract(1, 'seconds');
    //   // this.value = v * 100 / 10800;
    //   this.value = v * 100 / 120;
    //   this.render = this.dateReference.toDate();
    // });

  }

  /**
   * getTextProblem
   */
  public getTextProblem(message: string) {
    const messageFormated: string = message.length > 100 ? `${message.slice(0, 97)}...` : message;
    return messageFormated;
  }
}
