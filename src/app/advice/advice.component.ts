import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../app-transition';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { Problem } from '../entities/problem';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AdviceComponent implements OnInit {

  public problemList: Problem[] = [];

  constructor(
    private router: Router,
    private manager: ManagerService) { }

  ngOnInit() {
    this.problemList = this.manager.getProblemList();
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public goToAdviceForm(id: number) {
    console.log(`${AdviceComponent.name}::goToAdviceForm`);
    this.router.navigate([`/advice-form/${id}`]);
  }

}
