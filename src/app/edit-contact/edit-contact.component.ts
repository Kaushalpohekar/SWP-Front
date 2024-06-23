import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from './../Authentication/AuthService/encrypt.service';
import { AuthService } from './../Authentication/AuthService/auth.service';
import { LoadingService } from './../service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
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
    ]),
    trigger('fadeInOutInstructions', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 200ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EditContactComponent implements OnInit {
  editForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private encryptService: EncryptService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    console.log(this.user);
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      company_email: [this.user.company_email || '', [Validators.required, Validators.email]],
      contact_no: [this.user.contact_no || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      personal_email: [this.user.personal_email || '', [Validators.required, Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);
    if (this.editForm.valid) {
      this.authService.updateEmail(this.user.user_id, this.editForm.value).subscribe(
        success => {
          this.loadingService.isButtonLoading(false);
          this.dialogRef.close('success');
        },
        error => {
          this.loadingService.isButtonLoading(false);
          this.snackBar.open('An error occurred while saving', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this.loadingService.isButtonLoading(false);
      this.snackBar.open('Please fill in the required fields correctly', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Field is required';
    } else if ((controlName === 'personal_email' || controlName === 'company_email') && control?.hasError('email')) {
      return 'Invalid email format.';
    } else if (controlName === 'contact_no' && (control?.hasError('minlength') || control?.hasError('maxlength'))) {
      return 'Contact number must be exactly 10 digits.';
    }

    // Add additional conditions for other error types as needed

    return '';
  }
}
