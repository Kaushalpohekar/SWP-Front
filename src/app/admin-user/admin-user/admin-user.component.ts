import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateService } from '../admin-user-layout/insert-update/service/update.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {

  data:any;
  noDataMsg!:string;
  displayedColumns: string[] = ['name','username','role','contact','action'];
  dataSource= new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: AdminService, private sidenavService: UpdateService) {}

  ngOnInit() {
    this.departmentsData();
    this.departmentsSelect("");
  }

  
  updateToggleSidenav(data:any,type:string) {
    this.sidenavService.toggleSidenav();
    this.sidenavService.passData({data:data,type:type});
  }

  departmentsData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.departmentsData(id).subscribe(
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