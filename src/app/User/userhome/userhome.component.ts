import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Assume questionsData is the data you get from your API
    const questionsData = [
      { id: 1, question_text: 'What is your name?', question_type: 'shortAnswer' },
      { id: 2, question_text: 'Describe yourself.', question_type: 'longAnswer' },
      { id: 3, question_text: 'Select your gender:', question_type: 'multipleChoice', options: ['Male', 'Female'] },
      { id: 4, question_text: 'Select your hobbies:', question_type: 'checkbox', options: ['Reading', 'Traveling', 'Sports', 'Music', 'Art', 'Technology'] },
      { id: 5, question_text: 'Upload your resume:', question_type: 'upload' }
    ];

    this.setQuestions(questionsData);
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  setQuestions(questionsData: any) {
    const questions = this.form.get('questions') as FormArray;
    questionsData.forEach((question: any) => {
      const formControl = this.fb.control('');
      if (question.question_type === 'checkbox') {
        // For checkboxes, create a FormArray
        questions.push(this.fb.array(question.options.map(() => this.fb.control(false))));
      } else {
        questions.push(this.fb.control(''));
      }
    });
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const fileNameDisplay = document.getElementById(`file-name-${index}`);
      if (fileNameDisplay) {
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
      }
    }
  }

  onSubmit() {
    // Handle form submission
    console.log(this.form.value);
  }
}
