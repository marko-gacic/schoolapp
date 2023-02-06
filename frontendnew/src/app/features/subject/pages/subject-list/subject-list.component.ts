import { AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChild } from "@angular/core";
import { SortableHeaderDirective, SortEvent } from "src/app/shared/directives/sortable-header.directive";
import { Professor, Sub } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { Page } from "src/app/core/models/dtos";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { ConfirmOptions } from "src/app/core/models/enums";
import { ToastService } from "src/app/core/services/toast.service";
import { MatTableDataSource } from '@angular/material/table';

import { Sort } from "@angular/material/sort";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";



@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
    currentPage: Page = { page: 1, size: 3, orderBy: 'name', order: 'asc', totalItems: 10 };
    subject?: Sub[];
    professors?: Professor[];

    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChild(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;

    selectedSub?: Sub;
    selectedProfessor?: Professor;
    subscriptions = new Subscription();

    allSub$?: Observable<Sub[]>;
    allProf$?: Observable<Professor[]>;
    dataSource: any;
    displayedColumns: string[] = ['id', 'name', 'professor', 'description', 'noOfESP', 'yearOfStudy', 'semester', 'details', 'edit', 'delete'];
    responseMessage: any;
    value: any;
    searchTerm: string = '';
    professorMap: Map<number, Professor> = new Map();

    constructor(
        private httpSubject: HttpSubjectService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService,
        private httpProfessor: HttpProfessorService
    ) { }

    ngOnInit(): void {
        this.loadSubject();
        this.loadPageFromQueryParams();
        this.tableData();
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

    loadProfessorMap() {
        this.httpProfessor.getAllProfessors().subscribe(
            professors => {
                professors.forEach(professor => {
                    this.professorMap.set(professor.id, professor);
                });
            }
        )
    }

    loadSubject() {
        this.httpSubject.getByPage(this.currentPage).subscribe(
            subjectPage => {
                this.subject = subjectPage.content;
                this.currentPage.page = subjectPage.page;
                this.currentPage.totalItems = subjectPage.totalItems;
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
        this.loadSubject();
    }

    onDeleteClick(subToDelete: Sub) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Subject';
        modalRef.componentInstance.message = `Are you sure you want to delete ${subToDelete.name}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteSubject(subToDelete))

        );
    }

    tableData() {
        this.httpSubject.getSubject().subscribe(
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
        this.subject = this.subject?.filter(subject => {
            return subject.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        })
    }

    deleteSubject(subToDelete: Sub) {
        const subscription = this.httpSubject.delete(subToDelete.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Subject', message: 'Subject Deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadSubject();
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
