import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formId!: string;
  cards!: any[];
  selectedCard: any;
  questions!: any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formId = params['formId'];
      this.dataService.getCards().subscribe(cards => {
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
      this.router.navigate(['/u/h']);
    } else {
      this.dataService.getQuestions().subscribe(questions => {
        this.questions = questions.filter(question => question.formId === id);
      });
    }
  }


  handleInputChange(questionId: number, value: string) {
    const questionIndex = this.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      this.questions[questionIndex].answer = value;
    }
  }
}
