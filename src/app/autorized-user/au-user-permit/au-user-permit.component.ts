import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { forkJoin, Observable, Observer } from 'rxjs';
import { LoadingService } from '../../service/loading.service';
import { AlertService } from '../../service/alert.service';


@Component({
  selector: 'app-au-user-permit',
  templateUrl: './au-user-permit.component.html',
  styleUrls: ['./au-user-permit.component.css']
})

export class AuUserPermitComponent implements OnInit {
  type!: string;
  department_id!: string;
  cards: any[] = [];
  types: any[] = [];
  counts: any = {};

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    public loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadingService.isPageLoading(true);
      this.loadInitialData();
      this.cards = [];
    });
  }

  private loadInitialData(): void {
    forkJoin({
      types: this.dataService.getTypes(),
      userDetails: this.getUserDetails()
    }).subscribe({
      next: ({ types, userDetails }) => {
        this.types = types;
        this.department_id = userDetails.department_id;

        if (!this.types.some((type: any) => type.id === this.type)) {
          this.router.navigate(['/au/h']);
          return;
        }

        this.loadCategories();
      },
      error: (error) => {
        this.alertService.showAlert("Error loading data. Please try again later.", "error", 3000);
        this.router.navigate(['/au/h']);
      }
    });
  }

  private getUserDetails(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        const encodedUserDetails = this.cookieService.get('_usr_dtls');
        const userDetails = this.encryptService.decryptData(encodedUserDetails);
        observer.next(userDetails);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  private loadCategories(): void {
    const decryptUserId = this.encryptService.decryptData(this.cookieService.get('_user_id'));

    forkJoin({
      categories: this.dataService.getAllCaterogy(this.type, this.department_id),
      submissionCount: this.dataService.getSubmissionCount(this.type, decryptUserId)
    }).subscribe({
      next: ({ categories, submissionCount }) => {
        this.cards = categories;
        this.counts = submissionCount;
        this.loadingService.isPageLoading(false);
      },
      error: (error) => {
        console.error('Error loading categories or submission count:', error);
        this.alertService.showAlert("Error loading categories or submission count. Please try again later.", "error", 3000);
        this.loadingService.isPageLoading(false);
      }
    });
  }

  onCardClick(card: any): void {
    const categoryDetails = this.encryptService.encryptData(card);
    this.cookieService.set('_cat_dtls', categoryDetails, { path: '/' });
    this.router.navigate(['/au/f', this.type, card.category_id]);
  }
}
