import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, take } from "rxjs";
import { ExamPeriod } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { DeleteDialogComponent } from "src/app/shared/components/delete-dialog/delete-dialog.component";
import { EditExamPeriodDialogComponent } from "./dialogs/exam-period-dialog/edit-exam-period-dialog.component";




@Component({
    selector: 'app-exam-period-form',
    templateUrl: './exam-period-form.component.html',
    styleUrls: ['./exam-period-form.component.css']
})

export class ExamPeriodFormComponent implements OnInit {
    displayedColumns: string[] = ['name', 'start', 'end', 'status', 'edit', 'delete'];
    examPeriods = new MatTableDataSource<ExamPeriod>();
    value = '';
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    searchTerm: string = '';
    examPeriod?: ExamPeriod[];
    subscriptions = new Subscription();
    selectedExamPeriod?: ExamPeriod;


    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<ExamPeriod>;

    constructor(
        private formBuilder: FormBuilder = new FormBuilder(),
        private httpExamPeriod: HttpExamPeriodService,
        private toastService: ToastService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRefs: ChangeDetectorRef,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private liveAnnouncer: LiveAnnouncer,
        private modalService: NgbModal,
    ) { }
    examPeriodForm = this.formBuilder.nonNullable.group({
        id: [],
        name: ['', Validators.required],
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        status: [0, Validators.required],
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

    loadExamPeriod() {
        this.httpExamPeriod.getByPage(this.currentPage).subscribe(
            examPeriodPage => {
                this.examPeriod = examPeriodPage.content;
                this.currentPage.page = examPeriodPage.page;
                this.currentPage.totalItems = examPeriodPage.totalItems;
            }
        )
    }

    onSubmit(form: any) {
        this.httpExamPeriod.post(form).subscribe(res => {
            if (res) {
                this.openSnackBar('Exam Period Created', 'Close');
                this.httpExamPeriod.getAll().subscribe()
                this.refresh();
            }
        })
    }

    onDetailsClick(examPeriod: ExamPeriod, examPeriodDetailsTemplate: TemplateRef<any>) {
        this.selectedExamPeriod = examPeriod;
        this.modalService.open(examPeriodDetailsTemplate);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            panelClass: ['snackbar']
        });
    }

    openDialog(examPeriod: ExamPeriod) {
        this.dialog.open(EditExamPeriodDialogComponent, { data: examPeriod }).afterClosed().subscribe(() => {
            this.refresh();
        });
    }

    onDeleteClick(examPeriodToDelete: ExamPeriod) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Exam Period';
        modalRef.componentInstance.message = `Are you sure you want to delete ${examPeriodToDelete.name}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteExamPeriod(examPeriodToDelete))

        );
    }

    deleteExamPeriod(examPeriodToDelete: ExamPeriod) {
        const subscription = this.httpExamPeriod.delete(examPeriodToDelete.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Exam Period', message: 'Subject Deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadExamPeriod();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Exam Period', message: 'Error Deleting Subject', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.examPeriods.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this.liveAnnouncer.announce('Sorting cleared');
        }
    }



    openDeleteDialog(examPeriod: any) {
        this.dialog.open(DeleteDialogComponent, {
            data: {
                title: 'Are you sure?', message: `Do you want to delete exam period for ${examPeriod.name}`, confirmButton: "Delete", action: () => this.deleteExamPeriod(examPeriod.id)
            }
        })
    }

    refresh() {
        this.httpExamPeriod.getAll().subscribe((data: any[]) => {
            this.examPeriods.data = data
            this.changeDetectorRefs.detectChanges();
        })
    }

    ngAfterViewInit() {
        this.examPeriods.sort = this.sort;
    }


    ngOnInit(): void {
        this.refresh()
        this.loadExamPeriod();
        this.loadPageFromQueryParams();
    }

}