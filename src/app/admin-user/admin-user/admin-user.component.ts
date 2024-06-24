import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateService } from '../admin-user-layout/insert-update/service/update.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmSnackBarComponent } from 'src/app/confirm-snack-bar/confirm-snack-bar.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {

  data:any;
  selectedDep:string="";
  noDataMsg!:string;
  id!:string;
  displayedColumns: string[] = ['name','username','role','contact','action'];
  dataSource= new MatTableDataSource<any>();
  private subscription!: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute, private router: Router, private dataService: AdminService, private sidenavService: UpdateService) {}

  ngOnInit() {
    this.departmentsData();
    this.departmentsSelect("");

    this.subscription = this.dataService.departmentChange$.subscribe(() => {
      this.departmentsData();
      if(this.selectedDep!=''){this.departmentsSelect(this.selectedDep);}
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deleteUser(ID:string) {
    const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.dataService.deleteUser(ID).subscribe(
        () => {
          this.snackBar.open(`User Deleted Successfully`, 'Close', {
            duration: 3000,
          });
          this.departmentsSelect(this.selectedDep);          
        },
        (error) => {
          this.snackBar.open(`Error while deleting plant: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.snackBar.open(`Snack bar dismissed`, 'Close', {
        duration: 3000,
      });
    });
  }

  deleteDepartment(ID:string) {
    const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.dataService.deleteDepartment(ID).subscribe(
        () => {
          this.snackBar.open(`Department Deleted Successfully`, 'Close', {
            duration: 3000,
          });
          this.departmentsData();
        },
        (error) => {
          this.snackBar.open(`Error while deleting Department: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.snackBar.open(`Snack bar dismissed`, 'Close', {
        duration: 3000,
      });
    });
  }
  
  updateToggleSidenav(data:any,type:string) {
    this.sidenavService.toggleSidenav();
    this.sidenavService.passData({data:data,type:type});
  }

  departmentsData() {
    this.id = this.route.snapshot.paramMap.get('id')??'';
    if (this.id) {
      this.dataService.departmentsData(this.id).subscribe(
        (response) => {
          this.data = response;
        },
        (error) => {
          this.snackBar.open(`Error fetching departments data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open(`No Plant ID found.`, 'Close', {
        duration: 3000,
      });
    }
  }

  departmentsSelect(data:any){
    this.selectedDep=data;
    if(data){
      this.dataService.usersDataByDepartments(data.department_id).subscribe(
        (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          this.noDataMsg = error.error.error;
        }
      );
    } else {
      this.noDataMsg = "Department Not Selected."
    }
  }

  viewForms(card: any) {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/ad/home/users/'+id+'/forms/'+card.department_id]);
  }
}