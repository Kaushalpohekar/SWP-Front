import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../service/loading.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageComponent } from '../../image/image.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  submission_id!: string;
  data!: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public loadingService: LoadingService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.submission_id = params['submission_id'];
      this.fetchSubmission(this.submission_id);
    });
  }

  fetchSubmission(submission_id: string) {
    this.loadingService.isPageLoading(true); // Start loading when fetching begins

    this.dataService.getSubmissionDetails(submission_id).subscribe(
      (data) => {
        data.questions.sort((a: any, b: any) => a.questionText.localeCompare(b.questionText));
        this.data = data;
        this.loadingService.isPageLoading(false); // Turn off loading when data is successfully fetched
      },
      (error) => {
        this.loadingService.isPageLoading(false); // Turn off loading in case of error
        this.handleError('Failed to fetch submission details.'); // Handle error
      }
    );
  }

  generatePDF() {
    const data = document.getElementById('pdf-content'); // Element to capture

    if (data) {
      try {
        data.classList.add('no-shadow');
        html2canvas(data).then(canvas => {
          data.classList.remove('no-shadow');
          const imgWidth = 208;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          pdf.save('hot-work-permit.pdf');
        });
      } catch (error) {
        console.error('Error in generatePDF:', error);
        this.handleError('An error occurred while generating PDF.');
      }
    } else {
      this.handleError('No content found to generate PDF.');
    }
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  openImage(data: string) : void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { data };
    const dialogRef = this.dialog.open(ImageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMM d, y') ?? 'Invalid Date';
  }

  formatTime(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':');
    let formattedTime = (+hours % 12 || 12).toString();
    formattedTime += ':' + minutes + ' ';
    formattedTime += +hours >= 12 ? 'PM' : 'AM';
    return formattedTime;
  }
}
