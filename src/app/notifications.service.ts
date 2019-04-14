import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firebaseConfig, firebaseApiKey } from './firebase-config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * sendNotification
   */
  public sendNotification(user, message, token) {
    const url: string = 'https://fcm.googleapis.com/fcm/send';
    const firebaseKey = firebaseApiKey;
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `key=${firebaseKey}`)
    };

    const data = {
      to: token,
      notification: {
        title: `${user} han respondido tu pedido`,
        body: message,
        sound: "Tri-tone"
      }
    };


    return this.httpClient.post(url, JSON.stringify(data), httpOptions).toPromise();
  }


}
