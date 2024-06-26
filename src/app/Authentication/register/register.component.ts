import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationExtras } from '@angular/router';
import { EncryptService } from '../AuthService/encrypt.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword: boolean = true;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router, 
    private AuthService: AuthService,
    private EncryptService: EncryptService
    ) { 
    this.registerForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      CompanyName: ['', [Validators.required]],
      ContactNO: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      PersonalEmail: ['', [Validators.required, Validators.email]],
      CompanyEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
      CompanyAddress: ['', [Validators.required]]
    },
    {
      validators: this.passwordMatchValidator // custom validator to check if passwords match
    });
  }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    if (document.activeElement !== document.querySelector('input[formControlName="password"]')) {
      this.hidePassword = !this.hidePassword;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');

    return password ? null : { passwordMismatch: true };
  }

  submitForm() {
    if (this.registerForm.valid) {
      const personalEmailControl = this.registerForm.get('PersonalEmail');
      if(personalEmailControl){
        const PersonalEmail = personalEmailControl.value;
        this.AuthService.register(this.registerForm.value).subscribe(
          ()=>{
            this.redirectToRegVerify(PersonalEmail);
          },
          (error)=>{
            this.snackBar.open(
              error.error.message || 'Registration failed. Please try again.',
              'Dismiss',
              { duration: 2000 }
            );
          }
        );
      } else {
        console.error('Perosnal Email is not fetched!')
      }
    } else {
      this.registerForm.markAllAsTouched();
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
    if (this.registerForm.get(controlName)?.hasError('required')) {
      return 'Field is required';
    } else if ((controlName === 'PersonalEmail' || controlName === 'CompanyEmail') && this.registerForm.get(controlName)?.hasError('email')) {
      return 'Invalid email format.';
    } else if (controlName === 'ContactNO' && this.registerForm.get(controlName)?.hasError('pattern')) {
      return 'Contact number must contain only numbers.';
    } else if (controlName === 'ContactNO' && this.registerForm.get(controlName)?.hasError('minlength')) {
      return 'Contact number must be at least 10 characters long.';
    } else if (controlName === 'ContactNO' && this.registerForm.get(controlName)?.hasError('maxlength')) {
      return 'Contact number cannot exceed 10 characters.';
    } else if (this.registerForm.get('password')?.hasError('uppercase')) {
      return 'Password must contain at least one uppercase letter.';
    } else if (this.registerForm.get('password')?.hasError('number')) {
      return 'Password must contain at least one number';
    } else if (this.registerForm.get('password')?.hasError('specialChar')) {
      return 'Password must contain at least one special character';
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
      this.router.navigate(['/l/reg'], navigationExtras);
    } else {
      console.error('Personal email is null');
    }
  }
}
