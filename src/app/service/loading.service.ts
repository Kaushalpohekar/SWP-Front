import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public pageLoading = true;
  public displaying = true;
  public loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() { }

  public isPageLoading(isLoading: boolean) {
    this.pageLoading = isLoading;
  }

  public isDataLoading(isLoading: boolean) {
    this.displaying = isLoading;
  }

  isButtonLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
