import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam, Marks, Professor, Student, Sub } from 'src/app/core/models';
import { HttpExamService } from 'src/app/core/services/http-exam.service';
import { HttpMarksService } from 'src/app/core/services/http-marks.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { HttpStudentService } from 'src/app/core/services/http-student.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-marks-form',
  templateUrl: './marks-form.component.html',
  styleUrls: ['./marks-form.component.css']
})
export class MarksFormComponent implements OnInit {
  marksForm?: FormGroup;
  students$?: Observable<Student[]>;
  subjects$?: Observable<Sub[]>;
  exams$?: Observable<Exam[]>;
  professors$?: Observable<Professor[]>;


  constructor(
    private httpMarks: HttpMarksService,
    private httpStudent: HttpStudentService,
    private httpSub: HttpSubjectService,
    private httpExam: HttpExamService,
    private httpProfessor: HttpProfessorService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    const marks = this.activatedRoute.snapshot.data['marks']
    this.buildForm(marks);
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadSubjects();
    this.loadExams();
    this.loadProfessors();
  }

  buildForm(marks?: Marks) {
    this.marksForm = this.formBuilder.group({
      id: [marks?.id],
      student: [marks?.student, [Validators.required]],
      subject: [marks?.subject, [Validators.required]],
      exam: [marks?.exam, [Validators.required]],
      professor: [marks?.professor, [Validators.required]],
      mark: [marks?.mark, [Validators.required, Validators.min(5), Validators.max(10), Validators.pattern('^[0-9]*$')]],
      date: [marks?.date, [Validators.required]],
    });
  }

  loadStudents() {
    this.students$ = this.httpStudent.getAllStudents();

  }

  loadSubjects() {
    this.subjects$ = this.httpSub.getAll();

  }

  loadExams() {
    this.exams$ = this.httpExam.getAll();

  }

  loadProfessors() {
    this.professors$ = this.httpProfessor.getAllProfessors();

  }

  save() {
    if (this.marksForm?.invalid) {
      return;
    }
    /* Checking if the professor is responsible for the subject. */
    const marks = this.marksForm?.value;
    const subject = this.marksForm?.get('subject')?.value;
    const professor = this.marksForm?.get('professor')?.value;

    if (!subject || !professor || !subject.professorIds.includes(professor.id)) {
      this.toastService.showError('Error: Selected professor is not responsible for that subject');
      return;
    }

    if (marks.id) {
      this.httpMarks.putMarks(marks).subscribe(
        () => {
          this.toastService.showSuccess('Marks updated successfully');
          this.router.navigate(['/marks']);
        },
        () => this.toastService.showError('Error updating marks')
      );
    } else {
      this.httpMarks.postMarks(marks).subscribe(
        () => {
          this.toastService.showSuccess('Marks created successfully');
          this.router.navigate(['/marks']);
        },
        () => this.toastService.showError('Error creating marks')
      );
    }
  }

}
