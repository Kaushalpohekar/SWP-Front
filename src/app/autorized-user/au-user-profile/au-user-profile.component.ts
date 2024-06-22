import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-au-user-profile',
  templateUrl: './au-user-profile.component.html',
  styleUrls: ['./au-user-profile.component.css']
})
export class AuUserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  errorMessage: string = '';

  showSignature = false;
  user_id!: string;
  user: any = {};
  signature: any = {
    file_name: '',
    data: ''
  };

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
      this.fetchProfileDetails();
    }
  }

  fetchProfileDetails(): void {
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

  toggleSignature() {
    this.showSignature = !this.showSignature;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedFormats.includes(file.type)) {
        this.handleError('Please select a file in PNG, JPG, or JPEG format.');
        return;
      }
      const maxSizeKB = 250;
      if (file.size > maxSizeKB * 1024) {
        this.handleError(`File size should be less than ${maxSizeKB} KB.`);
        return;
      }
      this.errorMessage = '';
      const reader = new FileReader();
      reader.onload = () => {
        this.signature.file_name = file.name;
        this.signature.data = reader.result as string;
        this.uploadSignature();
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadSignature() {
    if (this.user_id) {
      const data = {
        user_id: this.user_id,
        sign: this.signature
      };

      try {
        const success = await this.dataService.insertSign(data).toPromise();
        console.log('Signature uploaded successfully:', success);
        this.handleSuccess('Signature uploaded successfully.');
        this.fetchProfileDetails(); // Refetch profile details after successful upload
      } catch (error) {
        console.error('Error uploading signature:', error);
        this.handleError('Failed to upload signature. Please try again later.');
      }
    } else {
      this.handleError('User ID is missing.');
    }
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
