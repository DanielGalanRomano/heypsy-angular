import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from './app-transition';
import { BackbuttonService } from './backbutton.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent implements OnDestroy {
  public showToast: boolean = true;

  constructor(
    private backbuttonService: BackbuttonService,
    private router: Router) {
    document.addEventListener(
      'backbutton',
      ($event) => {
        $event.preventDefault();
      },
      false);
  }

  public ngOnDestroy() {
    // document.removeEventListener('backbutton', () => { });
  }

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
