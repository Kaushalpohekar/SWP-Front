import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  hidePassword: boolean = true;
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.forgotForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  submitForm() {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value);
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
}
