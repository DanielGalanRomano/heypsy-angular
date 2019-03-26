import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }
  /**
   * initFirebase
   */
  public initFirebase() {
    const w: any = window;

    try {
      w.FirebasePlugin.getToken((token) => {
        console.log('TOKEN', token);
        // tslint:disable-next-line:align
      }, (error) => {
        console.log('TOKEN', error);

      });
    } catch (ex) {
      console.log('TOKEN', ex);
    }
  }
}
