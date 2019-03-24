import { Injectable } from '@angular/core';
import { Problem } from './entities/problem';
import { Person } from './entities/person';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public problemList: Problem[] = [];

  constructor() {

  }

  /**
   * createProblem
   */
  public createProblem(problem: string, requester: Person) {
    const newProblem = {
      id: this.generateId(),
      text: problem,
      requester: requester,
      assisted: false,
      scheduleDate: new Date()
    };

    this.problemList.push(newProblem);
  }

  public getProblemList() {
    return this.problemList;
  }

  public getProblemById(id: number): Problem[] {
    return this.problemList.filter((item) => item.id === id);
  }

  private generateId(): number {
    return Math.random();
  }

}
