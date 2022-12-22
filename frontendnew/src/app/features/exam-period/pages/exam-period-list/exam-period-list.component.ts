import { Component, QueryList, TemplateRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { ExamPeriod } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { SortableHeaderDirective, SortEvent } from "src/app/shared/directives/sortable-header.directive";




@Component({
    selector: 'app-exam-period-list',
    templateUrl: './exam-period-list.component.html',
    styleUrls: ['./exam-period-list.component.css']
})
export class ExamPeriodListComponent {

    currentPage: Page = { page: 1, size: 5, orderBy: 'periodName', order: 'asc', totalItems: 10 };
    examPeriod?: ExamPeriod[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    selectedExamPeriod?: ExamPeriod;
    subscriptions = new Subscription();
    allExamPeriod$?: Observable<ExamPeriod[]>;
    dataSource: any;
    displayedColumns: string[] = ['id', 'periodName', 'description', 'details', 'edit', 'delete'];
    responseMessage: any;
    value: any;
    searchTerm: string = '';
    sortableHeaders?: QueryList<SortableHeaderDirective>;




    constructor(
        private httpExamPeriod: HttpExamPeriodService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService,

    ) { }

    ngOnInit(): void {
        this.loadExamPeriod();
        this.loadPageFromQueryParams();
        this.tableData();
    }

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

    onSort(sortEvent: SortEvent) {
        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            });
        this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
        this.loadExamPeriod();
    }

    onDeleteClick(examPeriodToDelete: ExamPeriod) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Exam Period';
        modalRef.componentInstance.message = `Are you sure you want to delete ${examPeriodToDelete.periodName}?`;
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

    tableData() {
        this.httpExamPeriod.getAll().subscribe(
            (response) => {
                this.dataSource = new MatTableDataSource(response);
            },
            (error) => {
                this.responseMessage = error;
            }
        );
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    search() {
        this.examPeriod = this.examPeriod?.filter(examPeriod => {
            return examPeriod.periodName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        })
    }

    onDetailsClick(examPeriod: ExamPeriod, examPeriodDetailsTemplate: TemplateRef<any>) {
        this.selectedExamPeriod = examPeriod;
        this.modalService.open(examPeriodDetailsTemplate);
    }

    get tempContext() {
        return { number: 10 }
    }

}
