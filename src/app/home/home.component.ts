import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Flat to show/hide principal input.
   * @type {boolean}
   * @memberof HomeComponent
   */
  public showInput: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Show input.
   * @memberof HomeComponent
   */
  public renderInput() {
    this.showInput = true;
  }

}
