import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})

export class FormSelectComponent implements OnInit {
  type!: string;
  categoryID!: string;
  cards!: any[];
  selectedCard: any;
  forms!: any[];
  categoryDetails!: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private EncryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.categoryID = params['categoryID'];
      this.dataService.getAllForms(this.categoryID).subscribe(forms => {
        this.forms = forms;
      });
      const EncodedCategoryDetails = this.cookieService.get('_cat_dtls');
      this.categoryDetails = this.EncryptService.decryptData(EncodedCategoryDetails);
    });
  }

  proceed(formId: string): void {
    this.router.navigate(['/u/f', this.type, this.categoryID, formId]);
  }
}
