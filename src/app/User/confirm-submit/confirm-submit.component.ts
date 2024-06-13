import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-confirm-submit',
  templateUrl: './confirm-submit.component.html',
  styleUrls: ['./confirm-submit.component.css']
})
export class ConfirmSubmitComponent {
  formData!: any;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ConfirmSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData = data.data;
    console.log(this.formData);
  }

  onNoClick(): void {
    this.dialogRef.close('notSure');
  }

  onSaveClick(): void {
    if (this.formData) {
      this.dataService.submitFormData(this.formData).subscribe(
        () => {
          this.dialogRef.close('Success'); 
        },
        (error) => {
          this.dialogRef.close(error.error);
        }
      );
    }
  }
}
