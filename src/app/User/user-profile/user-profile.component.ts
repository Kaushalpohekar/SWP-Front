import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { AuthService } from '../../Authentication/AuthService/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDetailsComponent } from '../../edit-details/edit-details.component';
import { ChangePasswordComponent } from '../../change-password/change-password.component';
import { EditContactComponent } from '../../edit-contact/edit-contact.component';
import { ChangeProfileComponent } from '../../change-profile/change-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user_id!: string;
  user: any = {};
  errorMessage: string = '';
  
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private encryptService: EncryptService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadingService.isPageLoading(true);
    this.user_id = this.encryptService.decryptData(this.cookieService.get('_user_id'));
    if (this.user_id) {
      this.fetchProfileDetails();
    }
  }

  fetchProfileDetails(): void {
    this.dataService.getProfileDetails(this.user_id).subscribe(
      (user) => {
        this.user = user[0];
        this.loadingService.isPageLoading(false);
      },
      (error) => {
        console.error('Error fetching user profile details:', error);
        this.loadingService.isPageLoading(false);
        this.handleError('Failed to fetch user profile details. Please try again later.');
      }
    );
  }

  openEditProfile() : void{
    const user = {
      user_id: this.user_id,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      designation: this.user.designation || 'Employee',
      department: this.user.department_name
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    const dialogRef = this.dialog.open(EditDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchProfileDetails(); 
      }
    });
  }

  openChangePassword() : void{
    const user = {
      user_id: this.user_id,
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    const dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.authService.logout();
      }
    });
  }

  openEditContact() : void{
    const user = {
      user_id: this.user_id,
      personal_email: this.user.personal_email,
      contact_no: this.user.contact_no,
      company_email: this.user.company_email
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    const dialogRef = this.dialog.open(EditContactComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchProfileDetails(); 
      }
    });
  }

  openChangeProfile() : void{
    const user = {
      user_id: this.user_id,
      photo: this.user.profile.profile_photo
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { user };
    const dialogRef = this.dialog.open(ChangeProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchProfileDetails(); 
      }
    });
  }

  openContactAdmin() : void{
  }

  openRaiseAnIssue() : void{
    
  }

  private handleSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
