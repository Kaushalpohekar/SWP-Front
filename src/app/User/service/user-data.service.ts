import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  name: string;
  mobileNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private usersMap: { [key: string]: BehaviorSubject<User[]> } = {};

  private initializeKey(key: string): void {
    if (!this.usersMap[key]) {
      this.usersMap[key] = new BehaviorSubject<User[]>([]);
    }
  }

  getUsers$(key: string): Observable<User[]> {
    this.initializeKey(key);
    return this.usersMap[key].asObservable();
  }

  addUser(key: string, user: User): void {
    this.initializeKey(key);
    const currentUsers = this.usersMap[key].getValue();
    this.usersMap[key].next([...currentUsers, user]);
  }
}
