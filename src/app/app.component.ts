import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './app-transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'Heypsy-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
