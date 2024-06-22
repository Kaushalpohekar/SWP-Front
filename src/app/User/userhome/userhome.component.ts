import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LoadingService } from '../../service/loading.service';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  cards: any[] = [];
  originalCards: any[] = [];
  totalCount = 0;
  newCount = 0;
  approvedCount = 0;
  rejectedCount = 0;
  user_id = '';
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
  displayedColumns: string[] = ['serial', 'name', 'date', 'authorizer', 'status', 'action'];
  dataSource!: any[];
  countCards = [
    { title: 'Total', count: this.totalCount, type: 'new' },
    { title: 'New', count: this.newCount, type: 'Extend' },
    { title: 'Approved', count: this.approvedCount, type: 'Approved' },
    { title: 'Rejected', count: this.rejectedCount, type: 'Rejected' },
  ];

  constructor(
    private dataService: DataService,
    private router: Router,
    public loadingService: LoadingService,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadingService.isPageLoading(true);
    this.checkCookies();
    this.fetchData();
  }

  checkCookies(): void {
    const savedInterval = this.cookieService.get('_usr_hm_itrvl');
    const savedSort = this.cookieService.get('_usr_hm_srt');
    this.selectedInterval = savedInterval ? savedInterval : '1day';
    this.selectedSort = savedSort ? savedSort : 'total';
  }

  fetchData(): void {
    this.loadingService.isDataLoading(true);
    try {
      this.user_id = this.encryptService.decryptData(this.cookieService.get('_user_id'));
      forkJoin({
        formsList: this.dataService.getFormsList(this.user_id, this.selectedInterval),
        formsListCount: this.dataService.getFormsListCount(this.user_id, this.selectedInterval)
      }).pipe(
        catchError(error => {
          this.loadingService.isPageLoading(false);
          this.cards = [];
          this.totalCount = 0;
          this.newCount = 0;
          this.approvedCount = 0;
          this.rejectedCount = 0;
          this.updateCountCards(); // Ensure countCards are updated after resetting counts
          return throwError(error);
        })
      ).subscribe((response) => {
        this.cards = response.formsList;
        this.originalCards = [...this.cards];
        const data = response.formsListCount;
        this.totalCount = data.totalCount || 0;
        this.newCount = data.statusCounts.opened || 0;
        this.approvedCount = data.statusCounts.approved || 0;
        this.rejectedCount = data.statusCounts.rejected || 0;
        this.updateCountCards();
        this.loadingService.isPageLoading(false);
        this.updateCards(); // Ensure sorting is applied after data is fetched
      });
    } catch (error) {
      this.loadingService.isPageLoading(false);
      console.error('Error in fetchData:', error);
    }
  }

  updateCountCards(): void {
    this.countCards = [
      { title: 'Total', count: this.totalCount, type: 'new' },
      { title: 'New', count: this.newCount, type: 'Extend' },
      { title: 'Approved', count: this.approvedCount, type: 'Approved' },
      { title: 'Rejected', count: this.rejectedCount, type: 'Rejected' },
    ];
    this.loadingService.isDataLoading(false);
  }

  onOptionSelected(selectedInterval: any): void {
    this.selectedInterval = selectedInterval.value;
    this.cookieService.set('_usr_hm_itrvl', this.selectedInterval, { path: '/' });
    this.fetchData();
  }

  onOptionSelected2(selectedSort: any): void {
    this.selectedSort = selectedSort.value;
    this.cookieService.set('_usr_hm_srt', this.selectedSort, { path: '/' });
    this.updateCards();
  }

  updateCards(): void {
    switch(this.selectedSort) {
      case 'total':
        this.cards = [...this.originalCards];
        break;
      case 'approved':
        this.cards = this.originalCards.filter(card => card.status === 'approved');
        break;
      case 'rejected':
        this.cards = this.originalCards.filter(card => card.status === 'rejected');
        break;
      case 'opened':
        this.cards = this.originalCards.filter(card => card.status === 'opened');
        break;
      default:
        break;
    }
  }

  applyFilter(): void {
    this.fetchData(); // Re-fetch data when filter is applied
  }

  onViewClick(submission_id: string): void {
    this.router.navigate(['/u/view', submission_id]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + 330);
    const formattedDate = this.datePipe.transform(date, 'MMM d, y hh:mm a');
    return formattedDate ?? 'Invalid Date';
  }

  getStatusClasses(status: string): any {
    // Define your classes based on status
    switch (status) {
      case 'opened':
        return 'new-status'; // CSS class for new status
      case 'approved':
        return 'approved-status'; // CSS class for approved status
      case 'rejected':
        return 'rejected-status'; // CSS class for rejected status
      case 'extended':
        return 'extended-status'; // CSS class for extended status
      case 'revoked':
        return 'revoked-status'; // CSS class for revoked status
      default:
        return ''; // Default class if none of the above
    }
  }

  getStatusStyles(status: string): any {
    // Define your inline styles based on status
    switch (status) {
      case 'opened':
        return { color: 'blue' }; // Blue color for new status
      case 'approved':
        return { color: 'darkgreen' }; // Green color for approved status
      case 'rejected':
        return { color: 'darkred' };
      default:
        return {
          color: 'grey'
        }; // Default style if none of the above
    }
  }

  getStatusLabel(status: string): string {
    // Define your label based on status
    switch (status) {
      case 'opened':
        return 'New';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'extended':
        return 'Extended';
      case 'revoked':
        return 'Revoked';
      default:
        return ''; // Default label if none of the above
    }
  }
}
