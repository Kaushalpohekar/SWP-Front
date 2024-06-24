import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { LoadingService } from '../../service/loading.service';
import { AlertService } from '../../service/alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-au-user-form',
  templateUrl: './au-user-form.component.html',
  styleUrls: ['./au-user-form.component.css']
})
export class AuUserFormComponent implements OnInit {
  type!: string;
  categoryID!: string;
  originalForms: any[] = [];
  selectedCard: any;
  forms: any[] = [];
  categoryDetails: any;
  user_id!: string;
  selectedInterval!: string;
  selectedSort!: string;

  intervalData = [
    { name: 'Hour', value: '1hour' },
    { name: 'Day', value: '1day' },
    { name: 'Week', value: '1week' },
    { name: 'Month', value: '1month' },
    { name: 'Half Year', value: '6month' },
    { name: 'Full Year', value: '12month' }
  ];
  sortData = [
    { name: 'Total', value: 'total' },
    { name: 'Approved', value: 'approved' },
    { name: 'Rejected', value: 'rejected' },
    { name: 'New', value: 'opened' }
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    public loadingService: LoadingService,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.checkCookies();
    this.initializeComponent();
  }

  checkCookies(): void {
    const savedInterval = this.cookieService.get('_auth_frm_itrvl');
    const savedSort = this.cookieService.get('_auth_frm_srt');
    this.selectedInterval = savedInterval ? savedInterval : '1day';
    this.selectedSort = savedSort ? savedSort : 'total';
  }

  private initializeComponent(): void {
    try {
      this.loadCategoryDetails();
      this.route.params.subscribe(params => {
        this.type = params['type'];
        this.categoryID = params['categoryID'];
        if (this.categoryID) {
          this.loadForms();
        } else {
          throw new Error('Category ID is missing in route parameters');
        }
      });
    } catch (error) {
      this.handleError('Error during initialization:', error);
    }
  }

  private loadCategoryDetails(): void {
    const encodedCategoryDetails = this.cookieService.get('_cat_dtls');
    if (!encodedCategoryDetails) {
      throw new Error('Category details cookie is missing');
    }
    this.categoryDetails = this.encryptService.decryptData(encodedCategoryDetails);
  }

  private loadForms(): void {
    this.loadingService.isPageLoading(true);
    this.forms = [];
    try {
      this.user_id = this.encryptService.decryptData(this.cookieService.get('_user_id'));
      this.dataService.getFormsList(this.categoryID, this.user_id, this.selectedInterval).subscribe(
        forms => {
          this.originalForms = forms;
          this.applyFilters();
          this.loadingService.isPageLoading(false);
        },
        error => {
          this.handleError('No data found.', error);
        }
      );
    } catch (error) {
      this.handleError('Error loading forms:', error);
    }
  }

  onIntervalChange(selectedInterval: any): void {
    this.selectedInterval = selectedInterval.value;
    this.cookieService.set('_auth_frm_itrvl', this.selectedInterval, { path: '/' });
    this.loadForms();
  }

  onSortChange(selectedSort: any): void {
    this.selectedSort = selectedSort.value;
    this.cookieService.set('_auth_frm_srt', this.selectedSort, { path: '/' });
    this.applyFilters();
  }

  private applyFilters(): void {

    let filteredForms = [...this.originalForms];

    // Apply sort filter
    switch (this.selectedSort) {
      case 'approved':
        filteredForms = filteredForms.filter(form => form.status === 'approved');
        break;
      case 'rejected':
        filteredForms = filteredForms.filter(form => form.status === 'rejected');
        break;
      case 'opened':
        filteredForms = filteredForms.filter(form => form.status === 'opened');
        break;
      case 'total':
      default:
        // No additional filtering needed for 'total'
        break;
    }
    this.forms = filteredForms;
  }

  approved(): void {
    console.log('Approved Clicked!');
  }

  preview(submission_id: string): void {
    this.router.navigate(['/au/Preview', submission_id]);
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.loadingService.isPageLoading(false);
    this.snackBar.open('An error occurred. Please try again.', 'Close', {
      duration: 3000,
    });
    this.alertService.showAlert('Error loading data. Please try again later.', 'error', 3000);
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMM d, y') ?? 'Invalid Date';
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = (+hours % 12 || 12).toString();
    const period = +hours >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${period}`;
  }
}
