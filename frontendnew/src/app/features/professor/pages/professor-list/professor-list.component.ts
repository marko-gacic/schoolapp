import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { City, Professor, Title } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";
import { HttpTitleService } from "src/app/core/services/http-title.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
    selector: "app-professor-list",
    templateUrl: "./professor-list.component.html",
    styleUrls: ["./professor-list.component.css"]
})
export class ProfessorListComponent implements OnInit {
    cityMap: Map<number, City> = new Map();
    titleMap: Map<number, Title> = new Map();
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
    professors?: Professor[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    format: string = 'dd/MM/yyyy';
    subscriptions = new Subscription();
    allProfessors$?: Observable<Professor[]>;
    selectedProfessor?: Professor;
    searchTerm: string = '';




    constructor(
        private httpCity: HttpCityService,
        private httpProfessor: HttpProfessorService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService,
        private httpTitle: HttpTitleService

    ) { }

    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadCities();
        this.loadProfessors();
        this.loadTitles();
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

    loadCities() {
        this.httpCity.getAll().subscribe(
            cities => cities.forEach(city => this.cityMap.set(city.zip_code, city))
        )
    }

    loadTitles() {
        this.httpTitle.getAll().subscribe(
            titles => titles.forEach(title => this.titleMap.set(title.id, title))
        )
    }

    loadProfessors() {
        this.httpProfessor.getByPage(this.currentPage).subscribe(
            professorsPage => {
                this.professors = professorsPage.content;
                this.currentPage.page = professorsPage.page;
                this.currentPage.totalItems = professorsPage.totalItems;
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
        this.loadProfessors();
    }

    onDeleteClick(professor: Professor) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Professor';
        modalRef.componentInstance.message = `Are you sure you want to delete ${professor.firstName}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteProfessor(professor))

        );
    }

    search() {
        this.professors = this.professors?.filter(professor => {
            return professor.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        })
    }

    deleteProfessor(professor: Professor) {
        const subscription = this.httpProfessor.deleteProfessor(professor.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Professor', message: ' Professor', delay: 2000, classNames: 'bg-success' });
                    this.loadProfessors();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Professor', message: 'Error Deleting Professor', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    onDetailsClick(professor: Professor, professorDetailsTemplate: TemplateRef<any>) {
        this.selectedProfessor = professor;
        this.modalService.open(professorDetailsTemplate);
    }

    get tempContext() {
        return { number: 10 }
    }
}