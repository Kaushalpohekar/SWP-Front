import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imageData: string;
  isLoading: boolean = false;

  constructor(
    public loadingService: LoadingService,
    public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageData = data.data;
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
