import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../service/user-data.service';

interface User {
  name: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Input() userType!: string; // "workers" or "contractors"
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userDataService: UserDataService) {}

  ngOnInit(): void {
    if (!this.userType) {
      throw new Error('userType is required');
    }
    
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value as User;
      this.userDataService.addUser(this.userType, newUser);
      this.userForm.reset(); // Reset form after successful submission
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string) {
    if (this.userForm.get(controlName)?.hasError('required')) {
      return 'Field is required';
    } else if (controlName === 'mobileNumber' && this.userForm.get(controlName)?.hasError('pattern')) {
      return 'Contain only numbers.';
    } else if (controlName === 'mobileNumber' && this.userForm.get(controlName)?.hasError('minlength')) {
      return 'At least 10 characters long.';
    } else if (controlName === 'mobileNumber' && this.userForm.get(controlName)?.hasError('maxlength')) {
      return 'Cannot exceed 10 characters.';
    }
    return '';
  }
}
