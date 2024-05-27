import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})

export class PermitComponent implements OnInit {
  type!: string;
  cards: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.dataService.getCards2(this.type).subscribe(
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
    this.router.navigate(['/u/f', this.type, categoryID]);
  }
}
