import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Conversation } from '../entities/conversation';
import { ManagerService } from '../manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Problem } from '../entities/problem';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ConversationComponent implements OnInit, OnDestroy {

  /**
   * subscription reference.
   */
  private subscription: Subscription = null;
  private getConsejos$: Subscription = null;
  private getProblemById$: Subscription = null;
  public conversations: Conversation[] = [];
  public problem: Problem;

  private id: string;
  private role: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService,
    public dialog: MatDialog) { }

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
        .subscribe((problem: any) => {
          this.problem = problem[0];
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    if (this.getConsejos$ !== null) {
      this.getConsejos$.unsubscribe();
    }
  }

  openDialog() {
    this.dialog.open(DialogDataDialogComponent);
  }
  public goToHome() {
    console.log(`${ConversationComponent.name}::goToHome`);
    this.router.navigate(['/home']);
  }

  public goAdvice() {
    console.log(`${ConversationComponent.name}::goToHome`);
    this.router.navigate(['/advice']);
  }

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
