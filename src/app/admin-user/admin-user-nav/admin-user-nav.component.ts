import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';

@Component({
  selector: 'app-admin-user-nav',
  templateUrl: './admin-user-nav.component.html',
  styleUrls: ['./admin-user-nav.component.css']
})

export class AdminUserNavComponent {
  router: any;
  constructor (private AuthService: AuthService) {}
  Logout() {
    this.AuthService.logout();
  }

  profile() {
    this.router.navigate(['/ad/profile']);
  }
}