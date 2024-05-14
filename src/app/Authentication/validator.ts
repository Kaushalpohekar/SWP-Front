import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatcher: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
};

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value;

  if (!value) {
    return { 'required': true };
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  return valid ? null : { 'invalidPassword': true };
};
