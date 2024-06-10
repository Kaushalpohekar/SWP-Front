import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  constructor(private AuthService: AuthService) {}

  title = 'Smart Work Permit';

  Logout() {
    this.AuthService.logout();
  }
}