import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManagerService } from 'src/app/manager.service';
import { Problem } from 'src/app/entities/problem';

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

  /**
   * subscription reference.
   */
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService) { }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe(params => {
        const id = +params['id'];
        if (id) {
          this.problem = this.manager.getProblemById(id)[0];
        }
      });
  }

  ngOnDestroy() {
    // Unsubscribe.
    this.subscription.unsubscribe();
  }

  /**
   * sendMessage
   */
  public sendMessage() {
    console.log(`${AdviceFormComponent.name}::sendMessage username %o , message %o`, this.username, this.message);
    const advisor = {
      name: this.username
    };

    this.manager.setAdvice(this.message, advisor, this.problem.requester);
  }

  public goToAdviceList() {
    console.log(`${AdviceFormComponent.name}::goToAdviceList`);
    this.router.navigate(['/advice']);
  }
}
