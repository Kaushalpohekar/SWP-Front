import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public pageLoading = true;
  public displaying = true;

  constructor() { }

  public isPageLoading(isLoading: boolean) {
    this.pageLoading = isLoading;
  }

  public isDataLoading(isLoading: boolean) {
    this.displaying = isLoading;
  }
}
