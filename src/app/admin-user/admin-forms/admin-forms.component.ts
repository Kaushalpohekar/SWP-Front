import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.css']
})
export class AdminFormsComponent {
  cards = [
    { title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
  ];

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  numberOfQuestions!:number;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forms();
    this.firstFormGroup.get("Questions")?.valueChanges.subscribe(value => {
      this.numberOfQuestions = value;
      this.addQuestions();
    });
  }

  forms() {
    this.firstFormGroup = this._formBuilder.group({
      FormName: ['', Validators.required],
      FormDescription: ['', Validators.required],
      Questions: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      QuestionOne: ['', Validators.required],
      QuestionsOneType: ['', Validators.required],
      OptionOne: ['', Validators.required]
    });
  }

  addQuestions() {
    // Clear existing controls
    Object.keys(this.secondFormGroup.controls).forEach(key => {
      this.secondFormGroup.removeControl(key);
    });

    // Add controls based on the updated number of questions
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      this.secondFormGroup.addControl(`Question${i}`, this._formBuilder.control('', Validators.required));
      this.secondFormGroup.addControl(`Question${i}Type`, this._formBuilder.control('', Validators.required));
      this.secondFormGroup.addControl(`Option${i}`, this._formBuilder.control('', Validators.required));
    }
  }

  getQuestionType(i: number): string {
    return this.secondFormGroup.get(`Question${i}Type`)?.value;
  }

  getQuestionsAndAnswers() {
    const questionsArray = [];
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      const question = this.secondFormGroup.get(`Question${i}`)?.value;
      const questionType = this.secondFormGroup.get(`Question${i}Type`)?.value;
      const options = this.secondFormGroup.get(`Option${i}`)?.value;
      questionsArray.push({
        question: question,
        questionType: questionType,
        options: options
      });
    }
    console.log(questionsArray);
  }  
}
