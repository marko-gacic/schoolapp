import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { Exam, ExamPeriod, Professor, Sub } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpExamService } from "src/app/core/services/http-exam.service";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { SortableHeaderDirective, SortEvent } from "src/app/shared/directives/sortable-header.directive";



@Component({
    selector: 'app-exam-list',
    templateUrl: './exam-list.component.html',
    styleUrls: ['./exam-list.component.css']
})

export class ExamListComponent implements OnInit {
    subjectMap: Map<number, Sub> = new Map();
    professorMap: Map<number, Professor> = new Map();
    examPeriodMap: Map<number, ExamPeriod> = new Map();
    currentPage: Page = { page: 1, size: 5, orderBy: 'date', order: 'asc', totalItems: 10 };
    exams?: Exam[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    format: string = 'dd/MM/yyyy';
    subscriptions = new Subscription();
    allExams$?: Observable<Exam[]>;
    selectedExam?: Exam;
    searchTerm: string = '';


    constructor(
        private httpExam: HttpExamService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService,
        private httpSubject: HttpSubjectService,
        private httpProfessor: HttpProfessorService,
        private httpExamPeriod: HttpExamPeriodService
    ) { }

    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadSubjects();
        this.loadProfessors();
        this.loadExamPeriods();
        this.loadExams();
    }

    loadPageFromQueryParams() {
        const page = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        if (page) {
            this.currentPage.page = page;
        }
        const size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        if (size) {
            this.currentPage.size = size;
        }
        const orderBy = this.activatedRoute.snapshot.queryParamMap.get('orderBy');
        if (orderBy) {
            this.currentPage.orderBy = orderBy;
        }
        const order = this.activatedRoute.snapshot.queryParamMap.get('order');
        if (order) {
            this.currentPage.order = order;
        }
    }

    loadSubjects() {
        this.httpSubject.getAll().subscribe(subjects => {
            subjects.forEach(subject => {
                this.subjectMap.set(subject.id, subject);
            });
        });
        console.log(this.subjectMap);

    }

    loadProfessors() {
        this.httpProfessor.getAllProfessors().subscribe(professors => {
            professors.forEach(professor => {
                this.professorMap.set(professor.id, professor);
            });
        });
    }

    loadExamPeriods() {
        this.httpExamPeriod.getAll().subscribe(examPeriods => {
            examPeriods.forEach(examPeriod => {
                this.examPeriodMap.set(examPeriod.id, examPeriod);
            });
        });
    }

    loadExams() {

        this.httpExam.getByPage(this.currentPage).subscribe(
            examPage => {
                this.exams = examPage.content;
                this.currentPage.page = examPage.page;
                this.currentPage.totalItems = examPage.totalItems;
            }
        )
    }

    onSort(sortEvent: SortEvent) {
        console.log(sortEvent, 'sortEvent');

        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            }
        )
        this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
        this.loadProfessors();
    }

    onDeleteClick(exam: Exam) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Exam';
        modalRef.componentInstance.message = `Are you sure you want to delete ${exam.id}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteExam(exam))

        );
    }

    deleteExam(exam: Exam) {
        const subscription = this.httpExam.deleteExam(exam.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Exam', message: 'Exam', delay: 2000, classNames: 'bg-success' });
                    this.loadExams();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Exam', message: 'Error Deleting Exam', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    onDetailsClick(exam: Exam, examDetailsTemplate: TemplateRef<any>) {
        this.selectedExam = exam;
        this.modalService.open(examDetailsTemplate);
    }

    get tempContext() {
        return { number: 10 }
    }
}