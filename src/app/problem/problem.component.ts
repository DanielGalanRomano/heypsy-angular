import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class ProblemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
