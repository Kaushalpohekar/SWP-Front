import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AlertService } from '../service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ right: '10px', opacity: 1 })),
      transition(':enter', [
        style({ right: '-300px', opacity: 0 }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ right: '-300px', opacity: 0 }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  show = false;
  message!: string;
  type!: 'success' | 'error' | 'warning';
  duration!: number;
  private subscription!: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.alertState.subscribe(alert => {
      this.message = alert.message;
      this.type = alert.type;
      this.duration = alert.duration;
      this.show = true;
      setTimeout(() => this.close(), this.duration);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.show = false;
  }
}
