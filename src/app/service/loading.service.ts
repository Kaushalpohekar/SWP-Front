import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoadingState(state: boolean) {
    this.loading$.next(state);
  }
}
