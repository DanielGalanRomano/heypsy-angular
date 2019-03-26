import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { Problem } from '../entities/problem';
import { interval, Subscription } from 'rxjs';
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
  private timerReference$: Subscription = null;

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
    this.problemList = this.manager.getProblemList();

    if (this.problemList.length > 0) {
      this.initCountdown(this.problemList[0].scheduleDate);
    }
  }

  ngOnDestroy() {
    if (this.timerReference$ !== null) {
      this.timerReference$.unsubscribe();
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
}
