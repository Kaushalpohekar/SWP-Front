// breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../admin-breadcrums/admin-breadcrums.component'; // Ensure you have defined the Breadcrumb interface

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs: Breadcrumb[] = [];
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumbs(this.router.routerState.snapshot.root);
      this.breadcrumbsSubject.next(this.breadcrumbs);
    });
  }

  getBreadcrumbs() {
    return this.breadcrumbsSubject.asObservable();
  }

  private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const label = route.data['breadcrumb'];
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;

    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
