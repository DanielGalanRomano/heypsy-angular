import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/app-transition';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advice-form',
  templateUrl: './advice-form.component.html',
  styleUrls: ['./advice-form.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AdviceFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToAdviceList() {
    this.router.navigate(['/advice']);
  }

}
