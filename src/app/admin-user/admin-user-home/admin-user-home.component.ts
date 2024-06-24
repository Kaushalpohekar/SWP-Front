import { Component, OnInit } from '@angular/core';
import { AdminService } from '../adminService/admin.service';
import { Router } from '@angular/router';
import { UpdateService } from '../admin-user-layout/insert-update/service/update.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmSnackBarComponent } from 'src/app/confirm-snack-bar/confirm-snack-bar.component';

@Component({
  selector: 'app-admin-user-home',
  templateUrl: './admin-user-home.component.html',
  styleUrls: ['./admin-user-home.component.css']
})
export class AdminUserHomeComponent implements OnInit {

  data: any;
  plantData: any;
  private plantChangeSubscription!: Subscription;

  constructor(private snackBar: MatSnackBar,private service: AdminService, private router: Router, private sidenavService: UpdateService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.organizationData();
    this.plantsData();

    this.plantChangeSubscription = this.service.plantChange$.subscribe(() => {
      this.plantsData();
    });
  }

  ngOnDestroy() {
    if (this.plantChangeSubscription) {
      this.plantChangeSubscription.unsubscribe();
    }
  }

  updateToggleSidenav(data:any,type:string) {
    this.sidenavService.toggleSidenav();
    this.sidenavService.passData({data:data,type:type});
  }

  deletePlant(ID:string) {
    const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.service.deletePlant(ID).subscribe(
        () => {
          this.snackBar.open('Plant Deleted Successfully', 'Close', {
            duration: 3000,
          });
          this.plantsData();
        },
        (error) => {
          this.snackBar.open(`Error while deleting plant:${error}` ,'Close', {
            duration: 3000,
          });
          console.error();
        }
      );
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.snackBar.open('Snack bar dismissed', 'Close', {
        duration: 3000,
      });
    });
  }

  organizationData() {
    const organizationId = this.service.retrieveOrganizationId();
    if (organizationId) {
      this.service.organizationData(organizationId).subscribe(
        (response) => {
          this.data = response[0];
        },
        (error) => {
          this.snackBar.open(`Error fetching organization data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open(`No organization ID found.`, 'Close', {
        duration: 3000,
      });
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
          this.snackBar.open(`Error fetching plants data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open(`No organization ID found.`, 'Close', {
        duration: 3000,
      });
    }
  }

  viewDetails(card: any) {
    this.router.navigate(['/ad/home/users/'+card.plant_id]);
    this.cookieService.set('_plant_id', card.plant_id, { path: '/' });
  }
}