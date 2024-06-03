import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  hidePassword: boolean = true;
  resetForm!: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar,
    private AuthService: AuthService,
    private router: Router
    ) { 
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator()]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  togglePasswordVisibility() {
    if (document.activeElement !== document.querySelector('input[formControlName="password"]')) {
      this.hidePassword = !this.hidePassword;
    }
  }

  submitForm() {
    if (this.resetForm.valid) {
      const formData = { ...this.resetForm.value, token: this.token };
      this.AuthService.resetPassword(formData).subscribe(
        ()=>{
          this.router.navigate(['/l/login']);
        },
        (error)=>{
          this.snackBar.open(
              error.error.message || 'Failed. Please try again.',
              'Dismiss',
              { duration: 2000 }
            );
        }
      );
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  passwordValidator() {
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

  getErrorMessage(controlName: string) {
    if (this.resetForm.get(controlName)?.hasError('required')) {
      return 'Field is required';
    } else if (this.resetForm.get('password')?.hasError('uppercase')) {
      return 'Password must contain at least one uppercase letter.';
    } else if (this.resetForm.get('password')?.hasError('number')) {
      return 'Password must contain at least one number';
    } else if (this.resetForm.get('password')?.hasError('specialChar')) {
      return 'Password must contain at least one special character';
    }
    return '';
  }
}
