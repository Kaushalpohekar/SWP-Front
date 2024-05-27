import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})

export class FormSelectComponent implements OnInit {
  type!: string;
  categoryID!: string;
  cards!: any[];
  selectedCard: any;
  forms!: any[];

  constructor(
    private serviceService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.categoryID = params['categoryID'];
      this.serviceService.getFormsList(this.categoryID).subscribe(forms => {
        this.forms = forms;
      });
    });
  }

  proceed(formId: string): void {
    this.router.navigate(['/u/f', this.type, this.categoryID, formId]);
  }
}
