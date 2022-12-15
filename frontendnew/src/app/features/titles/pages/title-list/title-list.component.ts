import { Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Title } from 'src/app/core/models';
import { Page } from 'src/app/core/models/dtos';
import { ConfirmOptions } from 'src/app/core/models/enums';
import { HttpTitleService } from 'src/app/core/services/http-title.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
    selector: 'app-title-list',
    templateUrl: './title-list.component.html',
    styleUrls: ['./title-list.component.css']
})

export class TitleListComponent implements OnInit, OnDestroy {

    titles?: Title[];
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'ASC', totalItems: 10 };

    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;

    selectedTitle?: Title;

    subscriptions = new Subscription();

    //************************   Priimer za asynPipe */
    allTitles$?: Observable<Title[]>;
    constructor(private httpTitle: HttpTitleService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        // this.httpTitle.getAll().subscribe(
        //   (titles) => this.titles = titles
        // );
        /// ************  pimer za async pipe
        this.allTitles$ = this.httpTitle.getAll();
        // *****************************************
        const page = Number(this.activeRoute.snapshot.queryParams['page']);
        if (page) { this.currentPage.page = page; }

        const size = Number(this.activeRoute.snapshot.queryParams['size']);
        if (size) { this.currentPage.size = size; }

        const orderBy = this.activeRoute.snapshot.queryParams['orderBy'];
        if (orderBy) { this.currentPage.orderBy = orderBy; }

        const order = this.activeRoute.snapshot.queryParams['order'];
        if (order) { this.currentPage.order = order; }

        this.loadTitlesByPage();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    loadTitlesByPage() {
        const subscription = this.httpTitle.getByPage(this.currentPage).subscribe(
            titlePage => {
                this.titles = titlePage.content;
                this.currentPage.page = titlePage.page;
                this.currentPage.totalItems = titlePage.totalItems;
                this.toastService.showToast({ classNames: '', header: 'Loading titles', message: 'Titles loaded successfully' })
            }
        );

        this.subscriptions.add(subscription);
    }

    onSort(sortEvent: SortEvent) {
        console.log('sort event:', sortEvent);

        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            }
        );
        this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
        this.loadTitlesByPage();
    }

    onDeleteClick(titleToDelete: Title) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Deleting title';
        modalRef.componentInstance.message = `Are you sure that you want to delete title ${titleToDelete.name} ?`;
        modalRef.result.then(
            result => (result === ConfirmOptions.YES) && (this.deleteTitle(titleToDelete))
        );
    }
    deleteTitle(titleToDelete: Title) {
        const subscription = this.httpTitle.deleteTitle(titleToDelete.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting title', message: 'Title deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadTitlesByPage();
                },
                error: error => {
                    this.toastService.showToast({ header: 'Deleting title', message: 'Title was not deleted', delay: 2000, classNames: 'bg-danger' })
                }
            }
        );

        this.subscriptions.add(subscription);
    }

    onDetailsClick(title: Title, titleDetailsTemplate: TemplateRef<any>) {
        this.selectedTitle = title;
        this.modalService.open(titleDetailsTemplate);
    }



    get tempContext() {
        return { number: 10 };
    }
}
