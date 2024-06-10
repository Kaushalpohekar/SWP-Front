import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ message: string, type: 'success' | 'error' | 'warning', duration: number }>();
  alertState = this.alertSubject.asObservable();

  constructor() { }

  showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success', duration: number = 3000): void {
    this.alertSubject.next({ message, type, duration });
  }
}
