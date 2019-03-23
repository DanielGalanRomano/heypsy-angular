import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AdviceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public goToAdviceForm() {
    this.router.navigate(['/advice-form']);
  }

}
