import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from "@angular/core";
import { SortableHeaderDirective, SortEvent } from "src/app/shared/directives/sortable-header.directive";
import { Sub } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { Page } from "src/app/core/models/dtos";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { ConfirmOptions } from "src/app/core/models/enums";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
    subjects?: Sub[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    selectedSub?: Sub;
    subscriptions = new Subscription();
    allSub$?: Observable<Sub[]>;


    constructor(
        private httpSubject: HttpSubjectService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.allSub$ = this.httpSubject.getAll();
        this.loadSubjects();
        this.loadPageFromQueryParams();
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
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    loadSubjects() {
        this.httpSubject.getByPage(this.currentPage).subscribe(
            subjectsPage => {
                this.subjects = subjectsPage.content;
                this.currentPage.page = subjectsPage.page;
                this.currentPage.totalItems = subjectsPage.totalItems;

            }
        );
    }

    onSort(sortEvent: SortEvent) {
        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            });
            this.currentPage = {page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0};
        this.loadSubjects();
    }

    onDeleteClick(subToDelete: Sub) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Subject';
        modalRef.componentInstance.message = `Are you sure you want to delete ${subToDelete.name}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteSubject(subToDelete))

        );
    }

    deleteSubject(subToDelete: Sub) {
        const subscription = this.httpSubject.deleteSubject(subToDelete.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Subject', message: 'Subject Deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadSubjects();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Subject', message: 'Error Deleting Subject', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    onDetailsClick(sub: Sub, subDetailsTemplate: TemplateRef<any>) {
        this.selectedSub = sub;
        this.modalService.open(subDetailsTemplate);
    }

    get tempContext() {
        return { number: 10 }
    }
}
