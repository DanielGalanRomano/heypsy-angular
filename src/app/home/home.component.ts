import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router, RouterOutlet } from '@angular/router';
import { ManagerService } from '../manager.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private manager: ManagerService,
    private firebase: FirebaseService) {

  }

  ngOnInit() {
    this.firebase.initFirebase();
  }

  public goToProblemForm() {
    console.log(`${HomeComponent.name}::goToProblemForm`);
    const conversations = this.manager.getConversations();

    if (conversations.length > 0) {
      this.router.navigate(['/conversation/requester']);
    } else {
      this.router.navigate(['/problem-form']);
    }
  }

  public goToAdvice() {
    console.log(`${HomeComponent.name}::goToAdvice`);

    this.router.navigate(['/advice']);
  }
}
