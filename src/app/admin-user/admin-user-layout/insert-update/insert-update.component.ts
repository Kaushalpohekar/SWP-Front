import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { UpdateService } from './service/update.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../adminService/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  cardsData:any;

  constructor(
    private snackBar : MatSnackBar,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private dataService: AdminService,
    private sidenavService: UpdateService,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.userForm = this.fb.group({
      personal_email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role_id: ['', Validators.required],
      department_id: ['', Validators.required],
      contact_no: ['', Validators.required],
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
      this.cardsData=data;
      console.log(data);
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
      name: data.name,
      location: data.location
    });
  }

  handleUserFormData(data: any) {
    this.userForm.patchValue({
      personal_email: data.personal_email,
      first_name: data.first_name,
      last_name: data.last_name,
      role_id: data.role_id,
      department_id: data.department_id,
      contact_no: data.contact_no
    });
  }

  handleDepartmentFormData(data: any) {
    this.departmentForm.patchValue({
      name: data.name,
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

  roles() {
    this.dataService.roles().subscribe(
      (response) => {
        this.rolesData = response;
      },
      (error) => {
        this.snackBar.open(`Error fetching user Roles: ${error}`, 'Close', {
          duration: 3000,
        });
      }
    );
  }

  submitPlant(){
    if(this.cardsData.type=='insertPlant' && this.plantForm.valid){
      const id = this.cardsData.data.organization_id;
      this.dataService.addPlant(id,this.plantForm.value).subscribe(
        () => {
          this.snackBar.open(`Plant added successfully.`, 'Close', {
            duration: 3000,
          });
          this.plantForm.reset();
          this.dataService.notifyPlantChange();
        },
        (error) => {
          this.snackBar.open(`Error adding plants data:`, 'Close', {
            duration: 3000,
          });
        }
      );      
    }
    else if (this.cardsData.type=='updatePlant' && this.plantForm.valid){
      const id = this.cardsData.data.plant_id;
      this.dataService.updatePlant(id,this.plantForm.value).subscribe(
        () => {
          this.snackBar.open(`Plant Updated successfully.`, 'Close', {
            duration: 3000,
          });
          this.dataService.notifyPlantChange();
        },
        (error) => {
          this.snackBar.open(`Error updating plants data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    }else {
      this.snackBar.open(`Please fill all required parameters.`, 'Close', {
        duration: 3000,
      });
    }
  }

  submitDepartment(){
    if(this.cardsData.type=='addDepartment' && this.departmentForm.valid){
      const id = this.cardsData.data;
      this.dataService.addDepartment(id,this.departmentForm.value).subscribe(
        () => {
          this.snackBar.open(`Department added successfully.`, 'Close', {
            duration: 3000,
          });
          this.departmentForm.reset();
          this.dataService.notifyDepartmentChange();
        },
        (error) => {
          this.snackBar.open(`Error adding departments data: ${error}`, 'Close', {
            duration: 3000,
          });
          console.error('', error);
        }
      );      
    }
    else if (this.cardsData.type=='editDepartment' && this.departmentForm.valid){
      const id = this.cardsData.data.department_id;
      this.dataService.updateDepartment(id,this.departmentForm.value).subscribe(
        () => {
          this.snackBar.open(`Department Updated successfully.`, 'Close', {
            duration: 3000,
          });
          this.dataService.notifyDepartmentChange();
        },
        (error) => {
          this.snackBar.open(`Error updating departments data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    }else {
      this.snackBar.open(`Please fill all required parameters.`, 'Close', {
        duration: 3000,
      });
    }
  }

  submitUser(){
    if(this.cardsData.type=='addUser' && this.userForm.valid){
      this.dataService.addUser(this.userForm.value).subscribe(
        () => {
          this.snackBar.open(`User added successfully.`, 'Close', {
            duration: 3000,
          });
          this.userForm.reset();
          this.dataService.notifyDepartmentChange();
        },
        (error) => {
          this.snackBar.open(`Error adding user data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );      
    }
    else if (this.cardsData.type=='editUser'&& this.userForm.get('personal_email')?.valid && this.userForm.get('first_name')?.valid && this.userForm.get('last_name')?.valid && this.userForm.get('role_id')?.valid && this.userForm.get('department_id')?.valid && this.userForm.get('contact_no')?.valid){
      const id = this.cardsData.data.user_id;
      this.dataService.updateUser(id,this.userForm.value).subscribe(
        () => {
          this.snackBar.open(`User Updated successfully.`, 'Close', {
            duration: 3000,
          });
          this.dataService.notifyDepartmentChange();
        },
        (error) => {
          this.snackBar.open(`Error updating user data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    }else {
      this.snackBar.open(`Please fill all required parameters.`, 'Close', {
        duration: 3000,
      });
    }
  }

  submitCategory(){
    if(this.cardsData.type=='addCategory' && this.categoryForm.valid){
      const id = this.cardsData.data;
      this.dataService.addCategory(id,this.categoryForm.value).subscribe(
        () => {
          this.snackBar.open(`Category added successfully.`, 'Close', {
            duration: 3000,
          });
          this.categoryForm.reset();
          this.dataService.notifyCategoryChange();
        },
        (error) => {
          this.snackBar.open(`Error adding Category data: ${error}`, 'Close', {
            duration: 3000,
          });
        }
      );      
    }else {
      this.snackBar.open(`Please fill all required parameters.`, 'Close', {
        duration: 3000,
      });
    }
  }
}
