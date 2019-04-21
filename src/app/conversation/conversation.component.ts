import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Conversation } from '../entities/conversation';
import { ManagerService } from '../manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Problem } from '../entities/problem';
import { BackbuttonService } from '../backbutton.service';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ConversationComponent implements OnInit, OnDestroy {

  public problem: Problem;
  public render: string;
  public value: number;
  public dateReference;

  /**
   * subscription reference.
   */
  private subscription: Subscription = null;
  private getConsejos$: Subscription = null;
  private getProblemById$: Subscription = null;
  public conversations: Conversation[] = [];
  private timerReference$: Subscription = null;
  private id: string;
  private role: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService,
    public dialog: MatDialog,
    private backbuttonService: BackbuttonService) { }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe(params => {
        const id = params['id'];
        const roleType = params['type'];
        if (roleType && id) {
          this.id = id;
          this.role = roleType;
        }
      });

    if (this.id !== '0') {
      this.getConsejos$ = this.manager.getConsejos$(this.id)
        .subscribe((response: any) => {
          this.conversations = response;
        });
      this.getProblemById$ = this.manager.getProblemById$().pipe(
        map(response => response.filter((item: any) => {
          return item.id !== undefined && item.id === this.id;
        }))
      )
        .subscribe((problem: Problem[]) => {
          this.problem = problem[0];
          if (this.problem !== undefined) {
            this.dateReference = new Date(this.problem.scheduleDate);
            this.initCountdown();
          }
        });
    }
  }

  ngOnDestroy() {

    if (this.timerReference$ !== null) {
      this.timerReference$.unsubscribe();
    }

    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    if (this.getConsejos$ !== null) {
      this.getConsejos$.unsubscribe();
    }

    this.backbuttonService.setLasView('/home');
  }

  /**
   * Open the dialog component.
   */
  public openDialog() {
    this.dialog.open(DialogDataDialogComponent);
  }

  /**
   * Init countDown.
   */
  public initCountdown() {
    const timer$ = interval(1000);

    this.timerReference$ = timer$.subscribe((v) => {
      const expirationDate = moment(this.problem.expirationDate, 'DD/MM/YYYY HH:mm:ss');
      const timeLeft = moment(expirationDate.diff(moment())); // get difference between now and timestamp
      const formatted = timeLeft.format('HH:mm:ss'); // make pretty

      this.render = formatted;
    });
  }

  /**
   * Redirect to home view.
   */
  public goToHome() {
    console.log(`${ConversationComponent.name}::goToHome`);
    this.router.navigate(['/home']);
  }

  /**
   * Redirect to advice view.
   */
  public goAdvice() {
    console.log(`${ConversationComponent.name}::goAdvice`);
    this.router.navigate(['/advice']);
  }

  /**
   * Evaluate if role is adviser.
   */
  public isAdviser() {
    return this.role !== '' && this.role === 'adviser';
  }
}


@Component({
  selector: 'app-conversation-dialog',
  templateUrl: 'conversation-dialog.html',
})
export class DialogDataDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogDataDialogComponent>) { }

  okClick(): void {
    this.dialogRef.close();
  }
}
