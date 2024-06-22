import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.css']
})
export class AdminFormsComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  numberOfQuestions = 0;
  requireOptions: boolean[] = [];
  data:any;
  dataSource:any;
  categorySelected:boolean=false;

  constructor(private _formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private dataService: AdminService) { }

  ngOnInit() {
    this.forms();
    this.categoriesData();
  }

  categoriesData() {
    const id = this.route.snapshot.paramMap.get('dep_id');
    if (id) {
      this.dataService.categoriesData(id).subscribe(
        (response) => {
          this.data = response;
        },
        (error) => {
          console.error('Error fetching departments data:', error);
        }
      );
    } else {
      console.warn('No Plant ID found.');
    }
  }

  CategorySelect(data:any){
    if(data){
      this.categorySelected=true;
      this.dataService.usersDataByDepartments(data.department_id).subscribe(
        (response) => {
          this.dataSource = response;
        },
        (error) => {
          error.error.error;
        }
      );
    } else {
      this.categorySelected=false;
    }
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
