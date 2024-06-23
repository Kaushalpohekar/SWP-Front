import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../adminService/breadcrums.service';

// Define the Breadcrumb interface at the top or in a separate file
export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-admin-breadcrums',
  templateUrl: './admin-breadcrums.component.html',
  styleUrls: ['./admin-breadcrums.component.css']
})
export class AdminBreadcrumsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.getBreadcrumbs().subscribe((breadcrumbs: Breadcrumb[]) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
