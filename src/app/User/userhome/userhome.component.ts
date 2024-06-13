import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LoadingService } from '../../service/loading.service';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { CookieService } from 'ngx-cookie-service';

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
  selectedInterval = '1day';
  selectedSort = 'total';
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
  displayedColumns: string[] = ['serial', 'name', 'date', 'authorizer', 'status'];
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
    private encryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.loadingService.isPageLoading(true);
    this.fetchData();
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
        this.approvedCount = data.statusCounts.approvedCount || 0;
        this.rejectedCount = data.statusCounts.rejectedCount || 0;
        this.updateCountCards();
        this.loadingService.isPageLoading(false);
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
  }

  onOptionSelected2(selectedSort: any): void {
    this.selectedSort = selectedSort.value;
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
}
