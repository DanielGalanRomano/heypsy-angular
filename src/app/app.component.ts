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
  public showToast: boolean = true;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  /**
   * hideToast
   */
  public hideToast() {
    this.showToast = false;
  }

  /**
   * redirectToGooglePlay
   */
  public redirectToGooglePlay() {
    console.log('Prueba');
    location.href = 'https://play.google.com/store/apps/details?id=com.wheypsy_8725119';
  }
}
