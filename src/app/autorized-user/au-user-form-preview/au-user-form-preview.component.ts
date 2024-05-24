import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-au-user-form-preview',
  templateUrl: './au-user-form-preview.component.html',
  styleUrls: ['./au-user-form-preview.component.css']
})
export class AuUserFormPreviewComponent implements OnInit{

  status: boolean = false;
  questions: any[] = [];
  formId!: string;
  formUID!: string;

  constructor(private route: ActivatedRoute, private serviceService:ServiceService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formId = params['formId'];
      this.formUID = params['formUID'];
      console.log(this.formId);
    });
    this.serviceService.getQuestions().subscribe(questions => {
      this.questions = questions.filter(question => question.formId === this.formId);
      console.log(this.questions);
    });
  }

  generatePDF() {
    const data = document.getElementById('pdf-content'); // Element to capture

    if (data) {
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
    }
  }
}
