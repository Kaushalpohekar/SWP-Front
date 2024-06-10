import { Component } from '@angular/core';
import { AuthService } from '../../Authentication/AuthService/auth.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{
  constructor(private AuthService: AuthService, private router: Router,) {}

  title = 'Smart Work Permit';

  Logout() {
    this.AuthService.logout();
  }

  profile(){
    this.router.navigate(['/u/profile']);
  }
}