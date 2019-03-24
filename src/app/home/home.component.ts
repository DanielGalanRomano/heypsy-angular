import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  public goToProblemForm() {
    console.log(`${HomeComponent.name}::goToProblemForm`);

    this.router.navigate(['/problem-form']);
  }

  public goToAdvice() {
    console.log(`${HomeComponent.name}::goToAdvice`);

    this.router.navigate(['/advice']);
  }
}
