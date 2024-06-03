import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  selectedDate: Date | null = null;

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }

  type!: string;
  categoryID!: string;
  formId!: string;
  cards!: any[];
  categoryDetails: any;
  questions!: any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private EncryptService: EncryptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.categoryID = params['categoryID'];
      this.formId = params['formId'];
      const EncodedCategoryDetails = this.cookieService.get('_cat_dtls');
      this.categoryDetails = this.EncryptService.decryptData(EncodedCategoryDetails);
      this.dataService.getQuestions(this.formId).subscribe(
        (data)=>{
          console.log(data);
          this.questions = data.questions;
        },
        (error)=>{
          console.error(error);
        });
    });
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
