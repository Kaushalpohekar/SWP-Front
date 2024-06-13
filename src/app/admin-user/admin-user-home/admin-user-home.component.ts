import { Component, OnInit } from '@angular/core';
import { AdminService } from '../adminService/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-home',
  templateUrl: './admin-user-home.component.html',
  styleUrls: ['./admin-user-home.component.css']
})
export class AdminUserHomeComponent implements OnInit {

  data: any;
  plantData: any;

  constructor(private service: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.organizationData();
    this.plantsData();
  }

  organizationData() {
    const organizationId = this.service.retrieveOrganizationId();
    if (organizationId) {
      this.service.organizationData(organizationId).subscribe(
        (response) => {
          this.data = response[0];
        },
        (error) => {
          console.error('Error fetching organization data:', error);
        }
      );
    } else {
      console.warn('No organization ID found.');
    }
  }

  plantsData() {
    const organizationId = this.service.retrieveOrganizationId();
    if (organizationId) {
      this.service.plantsData(organizationId).subscribe(
        (response) => {
          this.plantData = response;
        },
        (error) => {
          console.error('Error fetching plants data:', error);
        }
      );
    } else {
      console.warn('No organization ID found.');
    }
  }

  viewDetails(card: any) {
    // this.service.setCardData(card);
    this.router.navigate(['/ad/home/users/'+card.plant_id]);
  }
}
