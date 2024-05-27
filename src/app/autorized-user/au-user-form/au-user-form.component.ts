import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-au-user-form',
  templateUrl: './au-user-form.component.html',
  styleUrls: ['./au-user-form.component.css']
})

export class AuUserFormComponent implements OnInit {
  type!: string;
  formId!: string;
  cards!: any[];
  selectedCard: any;
  forms!: any[];

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.formId = params['formId'];
      this.serviceService.getCards().subscribe(cards => {
        this.cards = cards;
        this.loadFormData(this.formId);
      });
    });
  }

  loadFormData(id: string): void {
      console.log('Form ID:', id);
      this.selectedCard = this.cards.find(card => card.formId === id);
      if (!this.selectedCard) {
          this.snackBar.open('Error: Data for this form is not available', 'Close', {
              duration: 5000, // 5 seconds
              panelClass: ['error-snackbar']
          });
          this.router.navigate(['/au/home']);
      } else {
          this.serviceService.getForms().subscribe(forms => {
              this.forms = forms.filter(form => form.formId === id);
          });
      }
  }

  Approved(): void{
    console.log("approved Click!!")
  }

  Preview(formUID: string): void{
    this.router.navigate(['/au/Preview', this.formId, formUID, ]);
  }
}
