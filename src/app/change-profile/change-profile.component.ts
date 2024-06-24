import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from './../Authentication/AuthService/auth.service';
import { LoadingService } from './../service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css'],
  animations: [
    trigger('fadeInOutPassword', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ChangeProfileComponent implements OnInit{
  isLoading$: Observable<boolean>;
  profileImageFile: File | null = null;
  profileImageUrl: string | null = null;
  user: any;
  defaultImageUrl = '../../../assets/img/face.png';
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.profileImageUrl = this.user.photo || this.defaultImageUrl;
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);

    if (this.profileImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.profileImageFile);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        
        const imageData = {
          user_id: this.user.user_id,
          profileImage: {
            name: this.profileImageFile!.name,
            type: this.profileImageFile!.type,
            size: this.profileImageFile!.size,
            data: base64data
          }
        };

        this.authService.updateProfileImage(imageData).subscribe(
          success => {
            this.loadingService.isButtonLoading(false);
            this.profileImageUrl = base64data;
            this.dialogRef.close('success');
          },
          error => {
            this.loadingService.isButtonLoading(false);
            this.snackBar.open(error.error.message || 'An error occurred while saving', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
      };
    } else {
      this.loadingService.isButtonLoading(false);
      this.snackBar.open('Please select an image to upload', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedFormats.includes(file.type)) {
        this.errorMessage = 'Please select a file in PNG, JPG, or JPEG format.';
        this.profileImageFile = null;
        return;
      }
      const maxSizeKB = 500;
      if (file.size > maxSizeKB * 1024) {
        this.errorMessage = `File size should be less than ${maxSizeKB} KB.`;
        this.profileImageFile = null;
        return;
      }
      this.errorMessage = null;
      this.profileImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
