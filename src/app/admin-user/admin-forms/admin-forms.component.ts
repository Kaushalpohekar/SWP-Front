import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';
import { UpdateService } from '../admin-user-layout/insert-update/service/update.service';
import { CookieService } from 'ngx-cookie-service';
import { EncryptService } from '../../Authentication/AuthService/encrypt.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmSnackBarComponent } from 'src/app/confirm-snack-bar/confirm-snack-bar.component';


@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.css']
})
export class AdminFormsComponent implements OnInit {

  isLinear = true;
  id:string="";
  formData : any;
  formActive: Boolean = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  numberOfQuestions = 0;
  requireOptions: boolean[] = [];
  data:any;
  dataSource:any[]=[];
  categorySelected:boolean=false;
  activeCard: any = null;
  selectedCategory: any;
  private subscription!: Subscription;

  constructor(private snackBar : MatSnackBar, private _formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private dataService: AdminService, private sidenavService: UpdateService,private cookieService: CookieService, private EncryptService: EncryptService) { }

  ngOnInit() {
    this.forms();
    this.categoriesData();

    this.subscription = this.dataService.categoryChange$.subscribe(() => {
      this.categoriesData();
    });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateToggleSidenav(data:any,type:string) {
    this.sidenavService.toggleSidenav();
    this.sidenavService.passData({data:data,type:type});
  }

  categoriesData() {
    this.id = this.route.snapshot.paramMap.get('dep_id')??'';
    if (this.id) {
      this.dataService.categoriesData(this.id).subscribe(
        (response) => {
          this.data = response;
        },
        (error) => {
          this.snackBar.open(`Error fetching departments data: ${error.error.error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open(`No Plant ID found.`, 'Close', {
        duration: 3000,
      });
    }
  }

  CategorySelect(data:any){
    this.selectedCategory=data;
    this.dataSource=[]
    if(data){
      this.categorySelected=true;
      this.dataService.prevForms(data.category_id).subscribe(
        (response) => {
          this.dataSource = response;
        },
        (error) => {
          this.snackBar.open(error.error.error, 'Close', {
            duration: 3000,
          });
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

  Submit() {
    const questionsArray = this.secondFormGroup.get('questionsArray')?.value;
    const encodedUserId = this.cookieService.get('_user_id')

    const data = {
      form_name:this.firstFormGroup.get('FormName')?.value,
      form_description:this.firstFormGroup.get('FormDescription')?.value,
      created_by:this.EncryptService.decryptData(encodedUserId),
      category_id:this.selectedCategory.category_id,
      plant_id: this.route.snapshot.paramMap.get('id'),
      Questions:questionsArray,
    }

    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.dataService.addForm(data).subscribe(
        (response) => {     
          this.snackBar.open(`Form created Successfully, Id: ${response}`, 'Close', {
            duration: 3000,
          });     
          console.log('',response);
        },
        (error) => {
          this.snackBar.open(`Error creating form: ${error.error.error}`, 'Close', {
            duration: 3000,
          });
          console.error('', error);
        }
      );
    } else {
      this.firstFormGroup.markAllAsTouched();
      this.secondFormGroup.markAllAsTouched();
    }
  }

  setActiveCard(card: any): void {
    if (this.activeCard != card) {
      this.formActive = true;
      this.dataService.formData(card.form_id).subscribe(
        (response) => {
          this.formData = response;
        },
        (error) => {
          this.snackBar.open(`Error fetching departments data: ${error.error.error}`, 'Close', {
            duration: 3000,
          });
        }
      );
      this.activeCard = card;  
    } else {
      this.formActive = false;
      this.activeCard = null;
    }
  }

  isActive(card: any): boolean {
    return this.activeCard === card;
  }

  getOptionsText(question: any): string {
    return question.options.map((option: any) => option.option_text).join(', ');
  }

  deleteForm(ID:string) {
    const snackBarRef = this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.dataService.deleteForm(ID).subscribe(
        () => {
          this.snackBar.open(`Form Deleted Successfully`, 'Close', {
            duration: 3000,
          });    
        },
        (error) => {
          this.snackBar.open(`Error while deleting Form: ${error.error.error}`, 'Close', {
            duration: 3000,
          });
        }
      );
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.snackBar.open(`Snack bar dismissed`, 'Close', {
        duration: 3000,
      });
    });
  }
}
