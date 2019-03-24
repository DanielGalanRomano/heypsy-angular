import { Injectable } from '@angular/core';
import { Problem } from './entities/problem';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public problemList: Problem[] = [];

  constructor() {

    this.problemList = [
      {
        id: 0,
        text: 'No tengo amigos',
        user: 'Jose',
        scheduleDate: new Date()
      },
      {
        id: 1,
        text: 'Mi novia me dejo',
        user: 'Pepe',
        scheduleDate: new Date()
      },
      {
        id: 2,
        text: 'Estoy sola',
        user: 'Maria',
        scheduleDate: new Date()
      },
    ];
  }

  public getProblemList() {
    return this.problemList;
  }

  public getProblemById(id: number): Problem[] {
    return this.problemList.filter((item) => item.id === id);
  }

}
