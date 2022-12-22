import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { Exam, ExamPeriod, Professor, Sub } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpExamService } from "src/app/core/services/http-exam.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { DeleteDialogComponent } from "src/app/shared/components/delete-dialog/delete-dialog.component";
import { EditExamDialogComponent } from "./dialogs/exam-edit-dialog/edit-exam-dialog.component";




@Component({
    selector: 'app-exam-form',
    templateUrl: './exam-form.component.html',
    styleUrls: ['./exam-form.component.css']
})

export class ExamFormComponent implements OnInit {
    subjectMap: Map<number, Sub> = new Map();
    professorMap: Map<number, Professor> = new Map();
    periodMap: Map<number, ExamPeriod> = new Map();
    displayedColumns: string[] = ['subject', 'professor', 'date', 'examPeriod', 'edit', 'delete'];
    exams = new MatTableDataSource<Exam>();
    value = '';
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    searchTerm: string = '';
    exam?: Exam[];
    subscriptions = new Subscription();
    selectedExam?: Exam;
    subjects$?: Observable<Sub[]>;
    professors$?: Observable<Professor[]>;
    periods$?: Observable<ExamPeriod[]>;

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<Exam>;
    constructor(
        private formBuilder: FormBuilder = new FormBuilder(),
        private httpExam: HttpExamService,
        private toastService: ToastService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRefs: ChangeDetectorRef,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private liveAnnouncer: LiveAnnouncer,
        private modalService: NgbModal,
        private httpExamPeriod: HttpExamService,
        private httpProfessor: HttpExamService,
        private httpSubject: HttpExamService,
    ) { }

    examForm = this.formBuilder.group({
        id: [''],
        subject: ['', Validators.required],
        professor: ['', Validators.required],
        date: new FormControl<Date | null>(null),
        examPeriod: ['', Validators.required],
    });

    loadPageFromQueryParams() {
        const page = Number(this.activatedRoute.snapshot.queryParams['page']);
        if (page) { this.currentPage.page = page; }

        const size = Number(this.activatedRoute.snapshot.queryParams['size']);
        if (size) { this.currentPage.size = size; }

        const orderBy = this.activatedRoute.snapshot.queryParams['orderBy'];
        if (orderBy) { this.currentPage.orderBy = orderBy; }

        const order = this.activatedRoute.snapshot.queryParams['order'];
        if (order) { this.currentPage.order = order; }

    }

    loadProfessor() {
        this.httpProfessor.getAllProfessor().subscribe(
            professors =>
                professors.forEach(professor => {
                    this.professorMap.set(professor.id, professor);
                })
        )
    }

    loadSubject() {
        this.httpSubject.getAllSubject().subscribe(
            subjects =>
                subjects.forEach(subject => {
                    this.subjectMap.set(subject.id, subject);
                })
        )
    }

    loadPeriod() {
        this.httpExamPeriod.getAllExamPeriod().subscribe(
            periods =>
                periods.forEach(period => {
                    this.periodMap.set(period.id, period);
                })
        )
    }





    loadExam() {
        this.httpExam.getByPage(this.currentPage).subscribe(
            examPage => {
                this.exam = examPage.content;
                this.currentPage.page = examPage.page;
                this.currentPage.totalItems = examPage.totalItems;
            }
        )
    }

    onSubmit(form: any) {
        this.httpExam.post(form).subscribe(res => {
            if (res) {
                this.openSnackBar('Exam Period Created', 'Close');
                this.httpExam.getAll().subscribe()
                this.refresh();
            }
        })
    }

    onDeleteClick(examToDelete: Exam) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Exam Period';
        modalRef.componentInstance.message = `Are you sure you want to delete ${examToDelete.id}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteExamPeriod(examToDelete))

        );
    }

    deleteExamPeriod(examToDelete: Exam) {
        const subscription = this.httpExam.delete(examToDelete.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Exam ', message: 'Exam Deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadExam();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Exam ', message: 'Error Deleting Exam', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.exams.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this.liveAnnouncer.announce('Sorting cleared');
        }
    }

    openDialog(exam: Exam) {
        this.dialog.open(EditExamDialogComponent, { data: exam }).afterClosed().subscribe(() => {
            this.refresh();
        });
    }



    openDeleteDialog(examPeriod: any) {
        this.dialog.open(DeleteDialogComponent, {
            data: {
                title: 'Are you sure?', message: `Do you want to delete exam period for ${examPeriod.name}`, confirmButton: "Delete", action: () => this.deleteExamPeriod(examPeriod.id)
            }
        })
    }



    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            panelClass: ['snackbar']
        });
    }

    refresh() {
        this.httpExam.getAll().subscribe((data: any[]) => {
            this.exams.data = data
            this.changeDetectorRefs.detectChanges();
        })
    }

    ngAfterViewInit() {
        this.exams.sort = this.sort;
    }


    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadExam();
        this.refresh();
        this.loadProfessor();
        this.loadSubject();
        this.loadPeriod();

    }


}