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

  public problemResolvedList: Problem[] = [];
  public problemUnresolvedList: Problem[] = [];
  public dateReference: moment.Moment;
  public render: Date;
  public value: number;
  private timerReference$: Subscription = null;

  private problemUnresolvedListSubscription$: Subscription = null;
  private problemResolvedListSubscription$: Subscription = null;

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
    this.problemUnresolvedListSubscription$ = this.manager.getProblems$()
      .pipe(
        map(response => response.filter((item: any) => {
          return item.resolved !== undefined && !item.resolved;
        }))
      )
      .subscribe((problemList: Problem[]) => {
        this.problemUnresolvedList = problemList;
      });

    this.manager.getProblems$()
      .pipe(
        map(response => response.filter((item: any) => {
          return item.resolved !== undefined && item.resolved;
        }))
      )
      .subscribe((problemList: Problem[]) => {
        this.problemResolvedList = problemList;
      });

    if (this.problemUnresolvedList.length > 0) {
      this.initCountdown(this.problemUnresolvedList[0].scheduleDate);
    }
  }

  ngOnDestroy() {
    if (this.timerReference$ !== null &&
      this.problemResolvedListSubscription$ !== null &&
      this.problemUnresolvedListSubscription$ !== null) {
      this.timerReference$.unsubscribe();
      this.problemResolvedListSubscription$.unsubscribe();
      this.problemUnresolvedListSubscription$.unsubscribe();
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

  public initCountdown(date: Date) {
    this.dateReference = moment().hours(3).minutes(0).seconds(0);
    const timer$ = interval(1000);

    this.timerReference$ = timer$.subscribe((v) => {
      this.dateReference = this.dateReference.subtract(1, 'seconds');
      // this.value = v * 100 / 10800;
      this.value = v * 100 / 120;
      this.render = this.dateReference.toDate();
    });

  }

  /**
   * getTextProblem
   */
  public getTextProblem(message: string) {
    const messageFormated: string = message.length > 100 ? `${message.slice(0, 97)}...` : message;
    return messageFormated;
  }
}
