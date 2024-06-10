import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { forkJoin, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {
  type!: string;
  department_id!: string;
  cards: any[] = [];
  types: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private encryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadInitialData();
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
          this.router.navigate(['/u/h']);
          return;
        }

        this.loadCategories();
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        this.snackBar.open('Error loading data. Please try again later.', 'Close', { duration: 3000 });
        this.router.navigate(['/u/h']);
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
    this.dataService.getAllCaterogy(this.type, this.department_id).subscribe({
      next: (data) => {
        console.log(data);
        this.cards = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.snackBar.open('Error loading categories. Please try again later.', 'Close', { duration: 3000 });
      }
    });
  }

  onCardClick(card: any): void {
    const categoryDetails = this.encryptService.encryptData(card);
    this.cookieService.set('_cat_dtls', categoryDetails, { path: '/' });
    this.router.navigate(['/u/f', this.type, card.category_id]);
  }
}
