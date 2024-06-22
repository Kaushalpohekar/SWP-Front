import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-au-user-nav',
  templateUrl: './au-user-nav.component.html',
  styleUrls: ['./au-user-nav.component.css']
})
export class AuUserNavComponent implements OnInit {
  title = 'Authorized User';
  unreadCount: number = 0;
  img: any;
  notifications = [
    { title: 'Admin', message: 'We are trying to solve ur problem once it has been done then we connect with u directly.', read: true, time: new Date() },
    { title: 'Notification 2', message: 'Message for Notification 2', read: true, time: new Date() },
    { title: 'Notification 3', message: 'Message for Notification 3', read: true, time: new Date() },
    { title: 'Notification 4', message: 'Message for Notification 4', read: true, time: new Date() },
    { title: 'Notification 5', message: 'Message for Notification 5', read: true, time: new Date() }
  ];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cookieService: CookieService,
    private encryptService: EncryptService
    ) {
    this.updateUnreadCount();
  }

  ngOnInit(){
    this.authService.getProfilePhoto(this.encryptService.decryptData(this.cookieService.get('_user_id'))).subscribe(
      (img)=>{
        this.img = img;
      },
      (error)=>{
        console.error(error);
      }
    );
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
    this.router.navigate(['/au/profile']);
  }
}
