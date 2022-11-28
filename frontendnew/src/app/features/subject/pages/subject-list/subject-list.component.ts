import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { SortableHeaderDirective, SortEvent } from "src/app/shared/directives/sortable-header.directive";
import { Sub } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { Page } from "src/app/core/models/dtos";
import { ActivatedRoute } from "@angular/router";





@Component ({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
    currentPage: Page = {page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10};
    subjects?: Sub[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    
    constructor(
        private httpSubject: HttpSubjectService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadSubjects();
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
}