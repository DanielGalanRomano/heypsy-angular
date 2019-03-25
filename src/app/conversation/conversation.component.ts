import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Conversation } from '../entities/conversation';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ConversationComponent implements OnInit {

  public conversations: Conversation[] = [];

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
    this.conversations = this.manager.getConversations();
  }

  public goToHome() {
    console.log(`${ConversationComponent.name}::goToHome`);
    this.router.navigate(['/home']);
  }

}
