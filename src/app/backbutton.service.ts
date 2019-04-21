import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackbuttonService {

  private lastView: string;

  constructor() { }

  public setLasView(lastView: string) {
    this.lastView = lastView;
  }

  public getLasView(): string {
    return this.lastView;
  }
}
