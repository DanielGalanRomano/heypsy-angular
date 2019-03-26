import { Injectable } from '@angular/core';
import { Problem } from './entities/problem';
import { Person } from './entities/person';
import { Conversation } from './entities/conversation';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public problemList: Problem[] = [];

  public conversationsList: Conversation[] = [];

  private termsAndConditionsValue = false;

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

  public setAdvice(message: string, advisor: Person, requester: Person) {
    const newConversation: Conversation = {
      adviceDate: new Date(),
      advisor: advisor,
      message: message,
      requestDate: new Date(),
      requester: requester,
    };

    this.conversationsList.push(newConversation);
  }

  public getProblemList(): Problem[] {
    return this.problemList;
  }

  public getProblemById(id: number): Problem[] {
    return this.problemList.filter((item) => item.id === id);
  }

  public getConversations(): Conversation[] {
    return this.conversationsList;
  }

  public setTermsAndConditionsValue(value: boolean): void {
    this.termsAndConditionsValue = value;
  }

  public getTermsAndConditionsValue(): boolean {
    return this.termsAndConditionsValue;
  }

  private generateId(): number {
    return Math.random();
  }

}
