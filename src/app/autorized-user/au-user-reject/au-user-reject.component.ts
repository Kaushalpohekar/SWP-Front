import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../service/data.service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { LoadingService } from '../../service/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-au-user-reject',
  templateUrl: './au-user-reject.component.html',
  styleUrls: ['./au-user-reject.component.css'],
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
export class AuUserRejectComponent implements OnInit{
  submission_id!: string;
  rejectForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private encryptService: EncryptService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AuUserRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.submission_id = data.data;
    this.rejectForm = this.fb.group({
      submission_id: this.submission_id,
      rejected_by: this.encryptService.decryptData(this.cookieService.get('_user_id')),
      password: ['', [Validators.required]]
    });
    this.isLoading$ = this.loadingService.loading$;
  }
  ngOnInit(){
    this.rejectForm.markAllAsTouched();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);
    if (this.rejectForm.valid) {
      this.dataService.rejectSubmission(this.rejectForm.value).subscribe(
        (response) => {
          this.dialogRef.close(true);
          this.snackBar.open('Submission rejected successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadingService.isButtonLoading(false);
        },
        (error) => {
          console.error('Error approving submission:', error);
          this.snackBar.open('Error approving submission: ' + error.error.message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loadingService.isButtonLoading(false);
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
}
