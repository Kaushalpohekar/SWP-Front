import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isPermit = state.root.queryParams['state'];
    if (isPermit) {
      return true;
    } else {
      this.router.navigate(['/l/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
