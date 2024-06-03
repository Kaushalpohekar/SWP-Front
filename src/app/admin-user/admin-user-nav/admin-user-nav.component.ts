import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';

@Component({
  selector: 'app-admin-user-nav',
  templateUrl: './admin-user-nav.component.html',
  styleUrls: ['./admin-user-nav.component.css']
})

export class AdminUserNavComponent {
  constructor (private AuthService: AuthService) {}
  Logout() {
    this.AuthService.logout();
  }
}