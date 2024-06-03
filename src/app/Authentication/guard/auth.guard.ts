import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../AuthService/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router, private CookieService: CookieService, private EncryptService: EncryptService ) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const isLoggedIn = this.AuthService.isLoggedIn();
  const storedToken = this.CookieService.get('_token');

  if (isLoggedIn && storedToken) {
    const tokenMatches = storedToken === this.AuthService.getToken();
    if (tokenMatches) {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  } else {
    this.router.navigate(['/login']);
    return false;
  }
}
}
