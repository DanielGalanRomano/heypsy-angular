import { Injectable } from '@angular/core';
import { Problem } from './entities/problem';
import { Conversation } from './entities/conversation';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Consejo } from './entities/consejo';
import * as moment from 'moment';
import { NotificationsService } from './notifications.service';
import { FirebaseService } from './firebase.service';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public problemList: Problem[] = [];

  public conversationsList: Conversation[] = [];

  private termsAndConditionsValue = false;

  private currentUser: User;

  constructor(
    private db: AngularFirestore,
    private firebaseService: FirebaseService,
    private notificationsService: NotificationsService) {
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

  /**
   * Return the problems list by id.
   */
  public getProblemById$(): Observable<{}[]> {
    return this.db.collection('problems').valueChanges();
  }

  /**
   * getConversationById
   */
  public getProblems$(): Observable<{}[]> {
    return this.db.collection('problems').valueChanges();
  }

  /**
   * Return the consejos list.
   */
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
      scheduleDate: moment().format('DD/MM/YYYY HH:mm:ss'),
      expirationDate: moment().add(24, 'hours').format('DD/MM/YYYY HH:mm:ss'),
      answers: 0,
      tokenNotification: this.firebaseService.getFirebaseToken(),
      assistedByArr: []
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
      scheduleDate: moment().format('DD/MM/YYYY HH:mm:ss'),
      expirationDate: moment().add(24, 'hours').format('DD/MM/YYYY HH:mm:ss'),
      problemAssociated: problemAssociated
    };

    this.db.collection('problems')
      .doc(`${problemAssociated}`)
      .collection('consejos')
      .add(newConsejo)
      .then(() => {
        if (this.currentUser !== null) {
          const newArray: string[] = [...problem.assistedByArr, this.currentUser.id];

          this.db.doc(`problems/${problemAssociated}`)
            .update({ assistedByArr: newArray });
        }

        this.db.doc(`problems/${problemAssociated}`)
          .update({ answers: problem.answers + 1 });

        if (problem.tokenNotification !== null) {
          this.notificationsService.sendNotification(user, newConsejo.message, problem.tokenNotification);
        }

        this.saveUserData(user, null);
      });
  }

  /**
   * Save user data.
   */
  public saveUserData(requester: string, newProblem: Problem) {

    const newUser: User = {
      id: this.createId(),
      user: requester,
      problem: newProblem,
      scheduleDate: new Date().toDateString()
    };

    localStorage.setItem('User', JSON.stringify(newUser));
  }

  /**
   * Return user data.
   */
  public getUserData() {
    const jsonUser = localStorage.getItem('User');
    if (jsonUser !== 'null' && jsonUser !== null) {
      this.currentUser = JSON.parse(jsonUser);
    } else {
      this.currentUser = null;
    }

    return this.currentUser;
  }

  /**
   * Delete user data.
   */
  private deleteUserData(): void {
    localStorage.setItem('User', null);
  }

  /**
   * Evaluate is request in progress.
   */
  public hasRequestInProcess() {
    return this.currentUser !== null && this.checkValidationHours();
  }

  /**
   * Check hour validation session.
   */
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
