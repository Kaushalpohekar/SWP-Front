import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { EncryptService } from '../AuthService/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private encryptService: EncryptService
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const encodedUserType = this.authService.getUserType();
      
      if (encodedUserType) { // Add a check for null
        const userType = this.encryptService.decryptData(encodedUserType);

        if (userType) {
          switch (userType) {
            case 'SuperAdmin':
              this.router.navigate(['/sa']);
              break;
            case 'Admin':
              this.router.navigate(['/ad']);
              break;
            case 'Authorizer':
              this.router.navigate(['/au']);
              break;
            case 'Standard':
              this.router.navigate(['/u']);
              break;
            default:
              this.router.navigate(['/u']);
              break;
          }
        }

        // Prevent access to the login page since the user is already logged in
        return false;
      }
    }

    // User is not logged in, allow access to the login page
    return true;
  }
}
