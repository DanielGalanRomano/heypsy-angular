import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/manager.service';
import { Problem } from 'src/app/entities/problem';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-advice-form',
  templateUrl: './advice-form.component.html',
  styleUrls: ['./advice-form.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AdviceFormComponent implements OnInit, OnDestroy {

  public problem: Problem;
  public message: string = '';
  public username: string = '';
  public idAssociated: string = '';

  private getProblemById: Subscription = null;

  /**
   * subscription reference.
   */
  private subscription: Subscription = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService) { }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe(params => {
        this.idAssociated = params['id'];
        if (this.idAssociated) {
          this.getProblemById = this.manager.getProblemById$().pipe(
            map(response => response.filter((item: any) => {
              return item.id !== undefined && item.id === this.idAssociated;
            }))
          )
            .subscribe((problem: any) => {
              this.problem = problem[0];
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription !== null || this.getProblemById !== null) {
      // Unsubscribe.
      this.subscription.unsubscribe();
      this.getProblemById.unsubscribe();
    }
  }

  /**
   * sendConsejo
   */
  public sendConsejo() {
    console.log(`${AdviceFormComponent.name}::sendMessage username %o , message %o`, this.username, this.message);

    this.manager.sendConsejo(this.message, this.username, this.idAssociated, this.problem);

    this.router.navigate([`/conversation/adviser/${this.idAssociated}`]);
  }

  /**
   * Redirect to advice list.
   */
  public goToAdviceList() {
    console.log(`${AdviceFormComponent.name}::goToAdviceList`);
    this.router.navigate(['/advice']);
  }

  /**
   * isFormComplete
   */
  public isFormComplete() {
    return this.username !== '' && this.message !== '';
  }

  /**
   * problemIsDefine
   */
  public problemIsDefine() {
    return this.problem !== undefined && this.problem !== null;
  }
}
