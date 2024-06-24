import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { UserDataService } from '../service/user-data.service';
import { Observable, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from '../../service/loading.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmSubmitComponent } from '../confirm-submit/confirm-submit.component';

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
  department_id!: string;
  user_id!: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private encryptService: EncryptService,
    private userDataService: UserDataService,
    public loadingService: LoadingService,
    public dialog: MatDialog
  ) {
    this.authorizerControl = new FormControl('', Validators.required);
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadingService.isPageLoading(true);
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
      const userDetails = this.encryptService.decryptData(this.cookieService.get('_usr_dtls'));
      this.department_id = userDetails.department_id;
      this.user_id = userDetails.user_id;

      combineLatest([
        this.dataService.getQuestions(this.formId),
        this.dataService.getAuthorizer(this.department_id)
      ]).pipe(takeUntil(this.unsubscribe$)).subscribe(
        ([questionsData, authorizerData]) => {
          this.questions = questionsData.questions.map((question: any) => ({
            ...question,
            options: question.options ? [...question.options.sort()] : [],
            answer: '', 
            attachment: null
          }));
          this.questions.sort((a, b) => a.question_text.localeCompare(b.question_text));
          this.authorizer = authorizerData.map((authorizer: any) => ({
              full_name: `${authorizer.first_name} ${authorizer.last_name}`,
              user_id: authorizer.user_id
          }));
          this.loadingService.isPageLoading(false);

          this.initializeCheckedValues(); // Initialize checked values here
        },
        error => {
          this.loadingService.isPageLoading(false); 
        }
      );

      this.usersWorkers$ = this.userDataService.getUsers$('workers');
      this.usersContractors$ = this.userDataService.getUsers$('contractors');
    });
  }

  private initializeCheckedValues() {
    this.questions.forEach(question => {
      if (question.question_type === 'checkbox') {
        this.checkedValues[question.question_id] = {};
        question.options.forEach((option: any) => {
          this.checkedValues[question.question_id][option] = false;
        });
      }
    });
  }

  worker() {
    this.toggle1 = !this.toggle1;
  }

  contractor() {
    this.toggle2 = !this.toggle2;
  }
  
  collectFormData(): void {
    if (this.form.invalid) {
      this.snackBar.open('All fields marked with * are required.', 'Close', {
        duration: 3000,
      });
      return;
    }

    combineLatest([this.usersWorkers$, this.usersContractors$]).pipe(takeUntil(this.unsubscribe$)).subscribe(
      ([workers, contractors]) => {
        this.workersData = workers;
        this.contractorsData = contractors;

        const formData = {
          requestedBy: this.user_id,
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
        if(formData){
          this.openConfirmDialog(formData);
        }
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
    }
  }

  handleCheckboxChange(questionId: number): void {
    const questionIndex = this.questions.findIndex(question => question.question_id === questionId);
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

  openConfirmDialog(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { data };
    const dialogRef = this.dialog.open(ConfirmSubmitComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Success') {
        this.openSnackBar('Operation successful', 'Close');
        this.router.navigate(['/u/h']);
      } else if (result === 'notSure') {
        this.openSnackBar('Operation status: Not sure', 'Close');
      } else if (result instanceof Error) {
        this.openSnackBar('An error occurred: ' + result.message, 'Close');
      } else {
        this.openSnackBar('Unknown result: ' + result, 'Close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration in milliseconds
    });
  }
}