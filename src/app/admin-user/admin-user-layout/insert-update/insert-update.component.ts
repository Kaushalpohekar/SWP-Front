import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { UpdateService } from './service/update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../adminService/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-insert-update',
  templateUrl: './insert-update.component.html',
  styleUrls: ['./insert-update.component.css']
})
export class InsertUpdateComponent implements OnInit {
  data: any;
  rolesData: any;
  public mode: MatDrawerMode = 'side';
  public opened: boolean = false;
  public passedData: any = { data: null, type: null };
  plantForm!: FormGroup;
  departmentForm!: FormGroup;
  userForm!: FormGroup;
  categoryForm!: FormGroup;
  private currentType: string = '';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dataService: AdminService,
    private sidenavService: UpdateService,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {
    this.plantForm = this.fb.group({
      plantName: ['', Validators.required],
      plantLocation: ['', Validators.required]
    });

    this.departmentForm = this.fb.group({
      departmentName: ['', Validators.required],
    });

    this.userForm = this.fb.group({
      personal_email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      form_type: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mode = 'over';
        this.opened = false;
      } else {
        this.mode = 'side';
        this.opened = false;
      }
    });

    this.sidenavService.sidenavToggle$.subscribe(() => this.toggleSidenav());
    this.sidenavService.dataPassing$.subscribe(data => {
      this.handleNewData(data);
    });

    // Listen to router events to close sidenav on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.opened) {
          this.toggleSidenav();
        }
      });
  }

  handleNewData(data: any) {
    if (this.currentType !== data.type && !this.opened) {
      setTimeout(() => this.toggleSidenav(), 200);
    }

    this.passedData = data;
    this.currentType = data.type;

    if (data && data.type === 'updatePlant') {
      this.handlePlantFormData(data.data);
    } else if (data && data.type === 'editDepartment') {
      this.handleDepartmentFormData(data.data);
    } else if (data && data.type === 'editUser') {
      this.departmentsData();
      this.roles();
      this.handleUserFormData(data.data);
    } else if (data && data.type === 'addUser') {
      this.resetForm();
      this.departmentsData();
      this.roles();
    } else {
      this.resetForm();
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  handlePlantFormData(data: any) {
    this.plantForm.patchValue({
      plantName: data.name,
      plantLocation: data.location
    });
  }

  handleUserFormData(data: any) {
    this.userForm.patchValue({
      personal_email: data.personal_email,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role_id,
      department: data.department_id,
      contact: data.contact_no
    });
  }

  handleDepartmentFormData(data: any) {
    this.departmentForm.patchValue({
      departmentName: data.name,
    });
  }

  resetForm() {
    this.plantForm.reset();
    this.departmentForm.reset();
    this.userForm.reset();
    this.categoryForm.reset();
  }

  departmentsData() {
    const id = this.cookieService.get('_plant_id');
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

  roles() {
    this.dataService.roles().subscribe(
      (response) => {
        this.rolesData = response;
      },
      (error) => {
        console.error('Error fetching user Roles:', error);
      }
    );
  }
}
