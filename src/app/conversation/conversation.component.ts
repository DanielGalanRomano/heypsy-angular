import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ConversationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
