import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private sidenavToggleSource = new Subject<void>();
  sidenavToggle$ = this.sidenavToggleSource.asObservable();

  private dataPassingSource = new Subject<any>();
  dataPassing$ = this.dataPassingSource.asObservable();

  toggleSidenav() {
    this.sidenavToggleSource.next();
  }

  passData(data: any) {
    this.dataPassingSource.next(data);
  }
}
