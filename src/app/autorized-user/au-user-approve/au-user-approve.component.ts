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
import { Router } from '@angular/router';

@Component({
  selector: 'app-au-user-approve',
  templateUrl: './au-user-approve.component.html',
  styleUrls: ['./au-user-approve.component.css'],
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
export class AuUserApproveComponent implements OnInit {
  submission_id!: string;
  approveForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading$!: Observable<boolean>;
  showUploadSignatureInstructions: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private encryptService: EncryptService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AuUserApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.submission_id = data.data;
    this.approveForm = this.fb.group({
      submission_id: this.submission_id,
      approved_by: this.encryptService.decryptData(this.cookieService.get('_user_id')),
      password: ['', [Validators.required]]
    });
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.approveForm.markAllAsTouched();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onProfileClick(): void {
    this.router.navigate(['/au/profile']);
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);
    if (this.approveForm.valid) {
      this.dataService.approveSubmission(this.approveForm.value).subscribe(
        (response) => {
          this.dialogRef.close(true);
          this.snackBar.open('Submission approved successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loadingService.isButtonLoading(false);
        },
        (error) => {
          console.error('Error approving submission:', error);
          if (error.error.message === 'Signature not found. Upload signature first!') {
            this.snackBar.open('Signature not found!', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            this.showUploadSignatureInstructions = true;
          } else {
            this.snackBar.open(error.error.message, 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
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
