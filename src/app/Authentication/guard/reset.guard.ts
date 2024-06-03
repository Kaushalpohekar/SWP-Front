import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const data = {
      token: 'SenseLive-Smart-Work-Permit'
    };

    return this.authService.getAllTokens(data).pipe(
      map(response => {
        if (response && response.token) {
          const routeToken = route.queryParams['token'];
          if (response.token.includes(routeToken)) {
            return true;
          } else {
            this.router.navigate(['/l/forgot']);
            return false;
          }
        } else {
          console.error('Invalid token response structure:', response);
          this.router.navigate(['/l/forgot']);
          return false; // Handle undefined response here
        }
      }),
      catchError(error => {
        console.error('Error during token verification process:', error);
        this.router.navigate(['/l/forgot']);
        return of(false); // Wrap false in `of` from rxjs
      })
    ).toPromise();
  }
}
