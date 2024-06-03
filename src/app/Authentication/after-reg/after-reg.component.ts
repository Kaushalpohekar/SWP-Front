import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../AuthService/auth.service';
import { EncryptService } from '../AuthService/encrypt.service';

@Component({
  selector: 'app-after-reg',
  templateUrl: './after-reg.component.html',
  styleUrls: ['./after-reg.component.css']
})
export class AfterRegComponent implements OnInit {

  PersonalEmail!: string;
  constructor(
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private EncryptService: EncryptService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encryptedEmail = params['state'];
      this.PersonalEmail = this.EncryptService.decryptData(encryptedEmail);
    });
  }
}
