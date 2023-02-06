

import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Exam, ExamPeriod, Professor, Student, Marks, Sub } from 'src/app/core/models';
import { Page } from 'src/app/core/models/dtos';
import { ConfirmOptions } from 'src/app/core/models/enums';
import { HttpExamService } from 'src/app/core/services/http-exam.service';
import { HttpExamPeriodService } from 'src/app/core/services/http-examperiod.service';
import { HttpMarksService } from 'src/app/core/services/http-marks.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { HttpStudentService } from 'src/app/core/services/http-student.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.css']
})
export class MarksListComponent implements OnInit {
  studentMap: Map<number, Student> = new Map();
  examMap: Map<number, Exam> = new Map();
  professorMap: Map<number, Professor> = new Map();
  examPeriodMap: Map<number, ExamPeriod> = new Map();
  subjectMap: Map<number, Sub> = new Map();

  currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
  marks?: Marks[];
  availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
  @ViewChildren(SortableHeaderDirective)
  sortableHeaders?: QueryList<SortableHeaderDirective>;

  format: string = 'dd/MM/yyyy';
  subscriptions = new Subscription();
  allMarks$?: Observable<Marks[]>;
  selectedMark?: Marks;
  searchTerm: string = '';



  constructor(
    private httpSubject: HttpSubjectService,
    private httpStudent: HttpStudentService,
    private httpExam: HttpExamService,
    private httpProfessor: HttpProfessorService,
    private httpExamPeriod: HttpExamPeriodService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastService: ToastService,
    private httpMarks: HttpMarksService,


  ) { }

  ngOnInit(): void {

    this.loadMarks();
    this.loadSubjects();
    this.loadStudentMap();
    this.loadExamMap();
    this.loadPageFromQueryParams();
    this.loadProfessorMap();

  }
  loadPageFromQueryParams() {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;
    const page = Number(queryParams.get('page'));
    const size = Number(queryParams.get('size'));
    const orderBy = queryParams.get('orderBy');
    const order = queryParams.get('order');
    this.currentPage = {
      page: page || 1, size: size || 3, orderBy: orderBy || 'id', order: order || 'asc', totalItems: 10
    };
  }

  loadMarks() {
    this.httpMarks.getByPage(this.currentPage).subscribe(
      marksPage => {
        this.marks = marksPage.content;
        this.currentPage.page = marksPage.page;
        this.currentPage.totalItems = marksPage.totalItems;
      }
    )
  }

  loadStudentMap() {
    this.httpStudent.getAllStudents().subscribe(
      students => {
        students.forEach(student => {
          this.studentMap.set(student.id, student);
        });
      }
    )

  }

  loadExamMap() {
    this.httpExam.getAll().subscribe(
      exams => {
        exams.forEach(exam => {
          this.examMap.set(exam.id, exam);
        });
      }
    )
  }

  loadProfessorMap() {
    this.httpProfessor.getAllProfessors().subscribe(
      professors => {
        professors.forEach(professor => {
          this.professorMap.set(professor.id, professor);
        });
      }
    )
  }

  loadSubjects() {
    this.httpSubject.getAll().subscribe(
      subjects => {
        subjects.forEach(subject => {
          this.subjectMap.set(subject.id, subject);
        });
      });
    console.log(this.subjectMap);

  }

  loadExamPeriodMap() {
    this.httpExamPeriod.getAll().subscribe(
      examPeriods => {
        examPeriods.forEach(examPeriod => {
          this.examPeriodMap.set(examPeriod.id, examPeriod);
        });
      }
    )
  }

  onSort(sortEvent: SortEvent) {
    this.sortableHeaders?.forEach(
      sortableHeader => {
        if (sortableHeader.sortable !== sortEvent.columnName) {
          sortableHeader.direction = '';
        }
      }
    )
    this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
    this.loadMarks();
  }

  onPageSizeChange() {
    this.currentPage.page = 1;
    this.loadMarks();
  }

  onPageChange() {
    this.loadMarks();
  }

  open(content: any, mark?: Marks) {
    this.selectedMark = mark;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onDeleteClick(marks: Marks) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.header = 'Delete Marks';
    modalRef.componentInstance.message = `Are you sure you want to delete ${marks.id}?`;
    modalRef.result.then(
      (result) => (result === ConfirmOptions.YES) && (this.deleteMarks(marks))

    );
  }

  deleteMarks(marks: Marks) {
    this.httpMarks.deleteMarks(marks.id).subscribe(
      () => {
        this.toastService.showSuccess('Marks deleted successfully');
        this.loadMarks();
      }
    )
  }

  onDetailsClick(marks: Marks, marksDetailsTemplate: TemplateRef<any>) {
    this.selectedMark = marks;
    this.modalService.open(marksDetailsTemplate);
  }

  onSearch() {
    this.currentPage.page = 1;
    this.loadMarks();
  }

  onReset() {
    this.searchTerm = '';
    this.currentPage.page = 1;
    this.loadMarks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
