import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})

export class PermitComponent implements OnInit {
  type!: string;
  department_id!: string;
  cards: any[] = [];


  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private EncryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      const EncodedUserDetails = this.cookieService.get('_usr_dtls');
      const userDetails = this.EncryptService.decryptData(EncodedUserDetails);
      this.department_id = userDetails.department_id;
      this.dataService.getAllCaterogy(this.type, this.department_id).subscribe(
        (data)=>{
          console.log(data);
          this.cards = data;
        },
        (error)=>{
          console.error(error);
        }
      );
    });
  }

  onCardClick(card: any): void {
    this.router.navigate(['/u/f', this.type, card.category_id]);
    const categoryDetails = this.EncryptService.encryptData(card);
    this.cookieService.set('_cat_dtls', categoryDetails, { path: '/u' });
  }
}
