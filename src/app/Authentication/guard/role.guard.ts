import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { EncryptService } from '../AuthService/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private encryptService: EncryptService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles: string[] = route.data['roles'];
    
    if (!requiredRoles) {
      // If no roles are defined in the route, deny access
      this.router.navigate(['/404']);
      return false;
    }

    const encodedUserType = this.authService.getUserType();

    if (encodedUserType) {
      const userType = this.encryptService.decryptData(encodedUserType);

      if (userType && requiredRoles.includes(userType)) {
        return true;
      }
    }

    // Redirect to 404 if the user type doesn't match any required roles or if there is no user type
    this.router.navigate(['/404']);
    return false;
  }
}
