import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  title = 'Smart Work Permit';
  unreadCount: number = 0;
  notifications = [
    { title: 'Admin', message: 'We are trying to solve ur problem once it has been done then we connect with u directly.', read: true, time: new Date() },
    { title: 'Notification 2', message: 'Message for Notification 2', read: true, time: new Date() },
    { title: 'Notification 3', message: 'Message for Notification 3', read: true, time: new Date() },
    { title: 'Notification 4', message: 'Message for Notification 4', read: true, time: new Date() },
    { title: 'Notification 5', message: 'Message for Notification 5', read: true, time: new Date() }
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.updateUnreadCount();
  }

  openNotification(notification: any) {
    // Handle notification click
    notification.read = true;
  }

  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(notification => !notification.read).length;
  }

  viewAllNotifications() {
    // Navigate to notifications page
    this.router.navigate(['/notifications']);
  }

  Logout() {
    this.authService.logout();
  }

  profile() {
    this.router.navigate(['/u/profile']);
  }
}
