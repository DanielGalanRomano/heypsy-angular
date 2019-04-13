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
    this.getUserData();

    if (this.hasRequestInProcess() && !this.checkValidationHours()) {
      this.deleteUserData();
    }
  }

  /**
   * Almacena el valor de terminos y condiciones.
   */
  public setTermsAndConditionsValue(value: boolean): void {
    this.termsAndConditionsValue = value;
  }

  /**
   * Devuelve el valor de terminos y condiciones.
   */
  public getTermsAndConditionsValue(): boolean {
    return this.termsAndConditionsValue;
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

  public getConsejos$(problemAssociated: string): Observable<{}[]> {

    return this.db.collection('problems')
      .doc(problemAssociated)
      .collection('consejos').valueChanges();
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

    this.db.collection('problems')
      .doc(`${problemAssociated}`)
      .collection('consejos')
      .add(newConsejo)
      .then(() => {
        this.db.doc(`problems/${problemAssociated}`).update({ answers: problem.answers + 1 });
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
    if (jsonUser !== 'null' && jsonUser !== null) {
      this.currentUser = JSON.parse(jsonUser);
    } else {
      this.currentUser = null;
    }

    return this.currentUser;
  }

  private deleteUserData(): void {
    localStorage.setItem('User', null);
  }

  public hasRequestInProcess() {
    return this.currentUser !== null && this.checkValidationHours();
  }

  private checkValidationHours(): boolean {
    let diff = 0;
    if (this.currentUser !== null && this.currentUser.scheduleDate !== undefined) {
      const now = moment().minutes(0).seconds(0);
      const dateToCompare = moment(this.currentUser.scheduleDate).minutes(0).seconds(0);
      diff = now.diff(dateToCompare, 'hours');

    }

    return diff < 24;
  }
}
