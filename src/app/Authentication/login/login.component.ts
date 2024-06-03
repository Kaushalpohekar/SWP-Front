import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';
import { EncryptService } from '../AuthService/encrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router, 
    private AuthService: AuthService,
    private EncryptService: EncryptService
    ) { 
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  togglePasswordVisibility() {
    if (document.activeElement !== document.querySelector('input[formControlName="password"]')) {
      this.hidePassword = !this.hidePassword;
    }
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.AuthService.login(this.loginForm.value).subscribe(
        (response) => {
          const token = response.token;
          this.AuthService.setToken(token);
          const checkUserType = () => {
            const EncodedUserType = this.AuthService.getUserType();
            if(EncodedUserType){
              const userType = this.EncryptService.decryptData(EncodedUserType);
              if (userType) {
                this.redirectUser(userType);
                this.snackBar.open('Login successful!', 'Dismiss', {
                  duration: 2000
                });
              } else {
                setTimeout(checkUserType, 100);
              }
            }
          };
          checkUserType();
        },
        (error) => {
          this.snackBar.open(
            error.error.message || 'Login failed. Please try again.',
            'Dismiss',
            { duration: 2000 }
          );
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string) {
    if (this.loginForm.get(controlName)?.hasError('required')) {
      return 'Email is required';
    } else if (controlName === 'usernameOrEmail' && this.loginForm.get(controlName)?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  redirectUser(userType: string) {
    if (userType === 'Standard') {
      this.router.navigate(['/u']);
    } else if (userType === 'Authorizer') {
      this.router.navigate(['/au']);
    } else if (userType === 'Admin') {
      this.router.navigate(['/ad']);
    } else if (userType === 'SuperAdmin') {
      this.router.navigate(['/sa']);
    }
  }
}
