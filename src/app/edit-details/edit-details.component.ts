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
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
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
export class EditDetailsComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    console.log(this.user);
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      first_name: [this.user.first_name || '', [Validators.required]],
      last_name: [this.user.last_name || '', [Validators.required]],
      designation: [this.user.designation || '', [Validators.required]],
      department: [this.user.department || '', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.loadingService.isButtonLoading(true);
    if (this.editForm.valid) {
      this.authService.updateUser(this.user.user_id, this.editForm.value).subscribe(
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
      this.snackBar.open('Please fill in the required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
