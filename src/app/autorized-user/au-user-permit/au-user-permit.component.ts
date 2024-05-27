import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-au-user-permit',
  templateUrl: './au-user-permit.component.html',
  styleUrls: ['./au-user-permit.component.css']
})

export class AuUserPermitComponent implements OnInit {
  type!: string;
  cards: any[] = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.serviceService.getCards2(this.type).subscribe(
        cards => {
          this.cards = cards;
        },
        error => {
          this.snackBar.open('Failed to load cards', 'Close', {
            duration: 3000,
          });
        }
      );
    });
  }

  onCardClick(categoryID: string): void {
    this.router.navigate(['/au/f', this.type, categoryID]);
  }
}
