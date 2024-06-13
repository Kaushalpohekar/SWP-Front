import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { LoadingService } from '../../service/loading.service';
import { AlertService } from '../../service/alert.service';

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
    private encryptService: EncryptService,
    public loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    try {
      const encodedCategoryDetails = this.cookieService.get('_cat_dtls');
      if (!encodedCategoryDetails) {
        throw new Error('Category details cookie is missing');
      }
      this.categoryDetails = this.encryptService.decryptData(encodedCategoryDetails);
      this.route.params.subscribe(params => {
        this.type = params['type'];
        this.categoryID = params['categoryID'];
        this.loadingService.isPageLoading(true);
        this.forms = [];
        if (this.categoryID) {
          this.loadForms(this.categoryID);
        } else {
          throw new Error('Category ID is missing in route parameters');
        }
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      this.snackBar.open('An error occurred during initialization. Please try again.', 'Close', {
        duration: 3000,
      });
      this.alertService.showAlert("Error loading data. Please try again later.", "error", 3000);
    }
  }

  // Method to load forms based on the category ID
  loadForms(category_id: string): void {
    this.dataService.getAllForms(category_id).subscribe(
      forms => {
        this.forms = forms;
        this.loadingService.isPageLoading(false);
      },
      error => {
        this.loadingService.isPageLoading(false);
        this.alertService.showAlert("No data Found.", "error", 3000);
      }
    );
  }

  // Method to proceed with the selected form
  proceed(form: any): void {
    try {
      const formDetails = this.encryptService.encryptData(form);
      this.cookieService.set('_frm_dtls', formDetails, { path: '/' });
      this.router.navigate(['/u/f', this.type, this.categoryID, form.form_id]);
    } catch (error) {
      console.error('Error during proceed:', error);
      this.snackBar.open('An error occurred while processing your request. Please try again.', 'Close', {
        duration: 3000,
      });
      this.alertService.showAlert("Error loading data. Please try again later.", "error", 3000);
    }
  }
}
