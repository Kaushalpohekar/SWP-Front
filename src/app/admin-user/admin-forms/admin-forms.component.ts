import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.css']
})
export class AdminFormsComponent implements OnInit {
  cards = [
    { title: 'HWP', subtitle: 'Hot Work Permit', icon: 'home' },
    { title: 'CWP', subtitle: 'Cold Work Permit', icon: 'home' },
  ];

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  numberOfQuestions = 0;
  requireOptions: boolean[] = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forms();
  }

  forms() {
    this.firstFormGroup = this._formBuilder.group({
      FormName: ['', Validators.required],
      FormDescription: ['', Validators.required],
      Questions: ['', [Validators.required, Validators.min(1)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      questionsArray: this._formBuilder.array([])
    });

    this.firstFormGroup.get('Questions')?.valueChanges.subscribe(value => {
      this.numberOfQuestions = value;
      this.requireOptions = new Array(this.numberOfQuestions).fill(true);
      this.updateQuestionsArray();
    });
  }

  updateQuestionsArray() {
    const questionsArray = this.secondFormGroup.get('questionsArray') as FormArray;
    questionsArray.clear();

    for (let i = 0; i < this.numberOfQuestions; i++) {
      questionsArray.push(this._formBuilder.group({
        Question: ['', Validators.required],
        QuestionType: ['', Validators.required],
        Option: ['']
      }));
    }
  }

  get questionsArray() {
    return (this.secondFormGroup.get('questionsArray') as FormArray).controls;
  }

  getQuestionType(i: number): string {
    return this.secondFormGroup.get(['questionsArray', i, 'QuestionType'])?.value;
  }

  setRequireOptions(i: number, required: boolean) {
    this.requireOptions[i] = required;
  }

  areOptionsRequired(i: number): boolean {
    return this.requireOptions[i];
  }

  getQuestionsAndAnswers() {
    const questionsArray = this.secondFormGroup.get('questionsArray')?.value;
    console.log(questionsArray);
  }
}
