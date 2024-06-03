import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';
import { EncryptService } from '../AuthService/encrypt.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router, 
    private AuthService: AuthService,
    private EncryptService: EncryptService
    ) { 
    this.forgotForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    
  }

  submitForm() {
    if (this.forgotForm.valid) {
      const personalEmailControl = this.forgotForm.get('usernameOrEmail');
      if(personalEmailControl){
        const PersonalEmail = personalEmailControl.value;
        this.AuthService.forgot(this.forgotForm.value).subscribe(
          ()=>{
            this.redirectToRegVerify(PersonalEmail);
          },
          (error)=>{
            this.snackBar.open(
              error.error.message || 'Failed! Please try again.',
              'Dismiss',
              { duration: 2000 }
            );
          }
        );
      } else {
        console.error('Perosnal Email is not fetched!')
      }
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string) {
    if (this.forgotForm.get(controlName)?.hasError('required')) {
      return 'Email is required';
    } else if (controlName === 'usernameOrEmail' && this.forgotForm.get(controlName)?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  redirectToRegVerify(PersonalEmail: string | null) {
    if (PersonalEmail) {
       const encryptedEmail = this.EncryptService.encryptData(PersonalEmail);
      const queryParams = {
        state: encryptedEmail 
      };
      const navigationExtras: NavigationExtras = {
        queryParams: queryParams
      };
      this.router.navigate(['/l/send-reset'], navigationExtras);
    } else {
      console.error('Personal email is null');
    }
  }
}
