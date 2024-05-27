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
  type!: string;
  categoryID!: string;
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
      this.type = params['type'];
      this.categoryID = params['categoryID'];
      this.formId = params['formId'];
      this.dataService.getCards2(this.categoryID).subscribe(cards => {
        this.cards = cards;
        this.loadFormData(this.formId);
      });
    });
  }

  loadFormData(id: string): void {
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
              // Initialize question.answer for checkbox type questions
              this.questions.forEach(question => {
                  if (question.type === 'checkbox') {
                      question.answer = {};
                  }
              });
          });
      }
  }


  handleInputChange(questionId: number, value: string) {
    const questionIndex = this.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      this.questions[questionIndex].answer = value;
    }
  }

  handleCheckboxChange(questionId: number, checkedValues: any) {
      const questionIndex = this.questions.findIndex(question => question.id === questionId);
      if (questionIndex !== -1) {
          let answer: any;
          if (Array.isArray(checkedValues)) {
              answer = {};
              checkedValues.forEach(option => {
                  answer[option] = true;
              });
          } else if (typeof checkedValues === 'object') {
              answer = checkedValues;
          } else {
          }
          this.questions[questionIndex].answer = answer;
      }
  }


handleDragOver(event: Event) {
  event.preventDefault();
}

displayFileName(event: any) {
  const file = event.target.files[0];
  const fileNameDisplay = document.getElementById('file-name');
  if (file && fileNameDisplay) { // Add a null check for fileNameDisplay
    fileNameDisplay.textContent = `Selected File: ${file.name}`;
  }
}

handleDrop(event: any) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const fileNameDisplay = document.getElementById('file-name');
  if (file && fileNameDisplay) { // Add a null check for fileNameDisplay
    fileNameDisplay.textContent = `Selected File: ${file.name}`;
  }
}




}
