import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Conversation } from '../entities/conversation';
import { ManagerService } from '../manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ConversationComponent implements OnInit {

  /**
   * subscription reference.
   */
  private subscription: Subscription;

  public conversations: Conversation[] = [];

  private role: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manager: ManagerService) { }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe(params => {
        const roleType = params['type'];
        if (roleType) {
          this.role = roleType;
        }
      });

    this.conversations = this.manager.getConversations();
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
