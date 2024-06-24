import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from './../Authentication/AuthService/auth.service';
import { LoadingService } from './../service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'] ,
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
export class ChangePasswordComponent {
  editForm: FormGroup;
  isLoading$: Observable<boolean>;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public loadingService: LoadingService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.isLoading$ = this.loadingService.loading$;

    this.editForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, this.passwordValidator()]]
    });
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);

    if (this.editForm.valid) {
      this.authService.updatePassword(this.user.user_id, this.editForm.value).subscribe(
        success => {
          this.loadingService.isButtonLoading(false);
          this.dialogRef.close('success');
        },
        error => {
          this.loadingService.isButtonLoading(false);
          this.snackBar.open( error.error.message || 'An error occurred while saving' , 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this.loadingService.isButtonLoading(false);
      this.snackBar.open('Please fill in the required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  passwordValidator(): any {
    return (control: FormControl) => {
      const value = control.value;
      if (!/[A-Z]/.test(value)) {
        return { uppercase: true };
      }
      if (!/[0-9]/.test(value)) {
        return { number: true };
      }
      if (!/[^A-Za-z0-9]/.test(value)) {
        return { specialChar: true };
      }
      return null;
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Field is required';
    } else if (controlName === 'newPassword' && control?.hasError('uppercase')) {
      return 'Password must contain at least one uppercase letter.';
    } else if (controlName === 'newPassword' && control?.hasError('number')) {
      return 'Password must contain at least one number';
    } else if (controlName === 'newPassword' && control?.hasError('specialChar')) {
      return 'Password must contain at least one special character';
    }

    return '';
  }
}
