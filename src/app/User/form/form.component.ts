import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { UserDataService } from '../service/user-data.service';
import { Observable, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface User {
  name: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  form!: FormGroup;
  authorizerControl: FormControl;
  usersWorkers$!: Observable<User[]>;
  usersContractors$!: Observable<User[]>;

  type!: string;
  categoryID!: string;
  formId!: string;
  cards!: any[];
  categoryDetails: any;
  formDetails: any;
  questions: any[] = [];
  authorizer!: any[];
  toggle1 = false;
  toggle2 = false;
  workersData: User[] = [];
  contractorsData: User[] = [];
  checkedValues: { [key: number]: { [key: string]: boolean } } = {};

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    private userDataService: UserDataService
  ) {
    this.authorizerControl = new FormControl('', Validators.required);
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initializeForm() {
    this.form = this.fb.group({
      authorizer: this.authorizerControl,
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      remarks: ['', Validators.required]
    });
  }

private initializeData() {
  this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
    this.type = params['type'];
    this.categoryID = params['categoryID'];
    this.formId = params['formId'];
    this.categoryDetails = this.encryptService.decryptData(this.cookieService.get('_cat_dtls'));
    this.formDetails = this.encryptService.decryptData(this.cookieService.get('_frm_dtls'));

    combineLatest([
      this.dataService.getQuestions(this.formId),
      this.dataService.getAuthorizer()
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(
      ([questionsData, authorizerData]) => {
        this.questions = questionsData.questions.map((question: any) => ({
          ...question,
          answer: '', 
          attachment: null
        }));
        console.log(this.questions); // Moved the console.log outside of the map function

        this.authorizer = authorizerData;
        this.questions.forEach(question => {
          if (question.question_type === 'checkbox') {
            this.checkedValues[question.id] = {};
            question.options.forEach((option: any) => {
              this.checkedValues[question.id][option] = false;
            });
          }
        });
      },
      error => console.error(error)
    );

    this.usersWorkers$ = this.userDataService.getUsers$('workers');
    this.usersContractors$ = this.userDataService.getUsers$('contractors');
  });
}


  worker() {
    this.toggle1 = !this.toggle1;
  }

  contractor() {
    this.toggle2 = !this.toggle2;
  }

  collectFormData(): void {
    combineLatest([this.usersWorkers$, this.usersContractors$]).pipe(takeUntil(this.unsubscribe$)).subscribe(
      ([workers, contractors]) => {
        this.workersData = workers;
        this.contractorsData = contractors;

        const formData = {
          formId: this.formId,
          categoryID: this.categoryID,
          authorizer: this.form.value.authorizer,
          startDate: this.form.value.startDate,
          startTime: this.form.value.startTime,
          endDate: this.form.value.endDate,
          endTime: this.form.value.endTime,
          location: this.form.value.location,
          remarks: this.form.value.remarks,
          workers: this.workersData,
          contractors: this.contractorsData,
          questions: this.questions.map(question => ({
            question_id: question.question_id,
            question_text: question.question_text,
            question_type: question.question_type,
            options: question.options,
            answer: question.answer,
            attachment: question.attachment
          }))
        };

        console.log('Form Data:', formData);
        // You can now send formData to your backend or use it as needed
      },
      error => console.error(error)
    );
  }

  onOptionSelected(selectedUser: any) {
    this.authorizerControl.setValue(selectedUser.user_id);
  }

  handleInputChange(questionId: number, value: string) {
    const questionIndex = this.questions.findIndex(question => question.question_id === questionId);
    if (questionIndex !== -1) {
      this.questions[questionIndex].answer = value;
      console.log(`Question ID: ${questionId}, Answer: ${value}`);
    }
  }

  handleCheckboxChange(questionId: number) {
    const questionIndex = this.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      const checkedValuesForQuestion = this.checkedValues[questionId];
      const selectedOptions = Object.keys(checkedValuesForQuestion)
        .filter(key => checkedValuesForQuestion[key])
        .join(':');
      
      this.questions[questionIndex].answer = selectedOptions;
    }
  }


  handleDragOver(event: Event) {
    event.preventDefault();
  }

  displayFileName(event: any, question: any) {
    const file = event.target.files[0];
    if (file) {
      this.readFile(file, question);
      const fileNameDisplay = document.getElementById(`file-name-${question.question_id}`);
      if (fileNameDisplay) {
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
      }
    }
  }

  handleDrop(event: any, question: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      this.readFile(file, question);
      const fileNameDisplay = document.getElementById(`file-name-${question.question_id}`);
      if (fileNameDisplay) {
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
      }
    }
  }

  readFile(file: File, question: any) {
    const reader = new FileReader();
    reader.onload = () => {
      question.attachment = {
        file_name: file.name,
        data: reader.result
      };
    };
    reader.readAsDataURL(file);
  }
}
