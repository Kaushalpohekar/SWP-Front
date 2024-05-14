import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { 
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
      console.log(this.loginForm.value);
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
}
