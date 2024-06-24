import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateService } from '../admin-user-layout/insert-update/service/update.service';
import { Subscription } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private router: Router, private dataService: AdminService, private sidenavService: UpdateService) {}

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
          console.error('Error fetching departments data:', error);
        }
      );
    } else {
      console.warn('No Plant ID found.');
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