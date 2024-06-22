import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user_id!: string;
  user: any = {};
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private encryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.loadingService.isPageLoading(true);
    this.user_id = this.encryptService.decryptData(this.cookieService.get('_user_id'));
    if (this.user_id) {
      this.dataService.getProfileDetails(this.user_id).subscribe(
        (user) => {
          this.user = user[0];
          console.log(this.user);
          this.loadingService.isPageLoading(false);
        },
        (error) => {
          console.error('Error fetching user profile details:', error);
          this.loadingService.isPageLoading(false);
          this.handleError('Failed to fetch user profile details. Please try again later.');
        }
      );
    }
  }

  private handleError(message: string): void {
    // You can also display the error message in a snackbar or toast
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
