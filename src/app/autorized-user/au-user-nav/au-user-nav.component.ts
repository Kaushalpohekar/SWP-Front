import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';

@Component({
  selector: 'app-au-user-nav',
  templateUrl: './au-user-nav.component.html',
  styleUrls: ['./au-user-nav.component.css']
})
export class AuUserNavComponent {
  constructor (private AuthService: AuthService) {}
  Logout() {
    this.AuthService.logout();
  }
}
