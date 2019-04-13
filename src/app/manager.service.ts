import { Injectable } from '@angular/core';
import { Problem } from './entities/problem';
import { Conversation } from './entities/conversation';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Consejo } from './entities/consejo';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public problemList: Problem[] = [];

  public conversationsList: Conversation[] = [];

  private termsAndConditionsValue = false;

  private currentUser;

  constructor(private db: AngularFirestore) {
    // if (this.hasRequestInProcess()) {
    //   this.deleteUserData();
    // }
  }


  public getProblemList(): Problem[] {
    return this.problemList;
  }

  public setTermsAndConditionsValue(value: boolean): void {
    this.termsAndConditionsValue = value;
  }

  public getTermsAndConditionsValue(): boolean {
    return this.termsAndConditionsValue;
  }

  public getProblemById(id: string): Problem[] {
    return this.problemList.filter((item) => item.id === id);
  }

  /**
   * createId
   */
  public createId(): string {
    return this.db.createId();
  }

  public getProblemById$(): Observable<{}[]> {
    return this.db.collection('problems').valueChanges();
  }

  /**
   * getConversationById
   */
  public getProblems$(): Observable<{}[]> {
    return this.db.collection('problems').valueChanges();
  }

  public getConsejos$(): Observable<{}[]> {
    return this.db.collection('consejos').valueChanges();
  }

  /**
   * getConversationById
   */
  public getConsejosById$(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection('consejos').get();
  }

  /**
   * sendProblem
   */
  public sendProblem(problem: string, requester: string): void {
    console.log(`${ManagerService.name}::sendProblem`);
    const newId = this.createId();
    const newProblem: Problem = {
      id: newId,
      requester: requester,
      message: problem,
      scheduleDate: new Date(),
      assisted: null,
      resolved: false,
      answers: 0
    };

    this.db.collection('problems')
      .doc(newId)
      .set(newProblem)
      .then(() => {
        this.saveUserData(requester, newProblem);
      });
  }

  /**
   * sendConsejo
   */
  public sendConsejo(consejo: string, user: string, problemAssociated: string, problem: Problem): void {
    console.log(`${ManagerService.name}::sendProblem`);
    const newId = this.createId();
    const newConsejo: Consejo = {
      id: newId,
      assistedBy: user,
      message: consejo,
      scheduleDate: new Date(),
      problemAssociated: problemAssociated
    };

    this.db.collection('consejos')
      .doc(newId)
      .set(newConsejo)
      .then(() => {
        this.db.doc(`problems/${problemAssociated}`).update({ resolved: true, answers: problem.answers + 1 });
      });
  }

  private saveUserData(requester: string, newProblem: Problem) {

    const newUser = {
      id: this.createId(),
      user: requester,
      problem: newProblem,
      scheduleDate: new Date()
    };

    localStorage.setItem('User', JSON.stringify(newUser));
  }


  public getUserData() {
    const jsonUser = localStorage.getItem('User');
    if (jsonUser !== 'undefined') {
      this.currentUser = JSON.parse(jsonUser);
    } else {
      this.currentUser = undefined;
    }

    return this.currentUser;
  }

  private deleteUserData(): void {
    localStorage.setItem('User', undefined);
  }

  public hasRequestInProcess() {
    let diff = 0;
    if (this.currentUser !== undefined) {
      const now = moment();
      const dateToCompare = moment(this.currentUser.scheduleDate);
      diff = now.diff(dateToCompare, 'hours');
    }

    return this.currentUser !== undefined && diff < 24;
  }
}
