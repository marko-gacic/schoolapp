import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { City, Professor } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';






@Component({
    selector: "app-professor-list",
    templateUrl: "./professor-list.component.html",
    styleUrls: ["./professor-list.component.css"]
})
export class ProfessorListComponent implements OnInit {
    cityMap: Map<number, City> = new Map();
    currentPage: Page = {page:1, size: 5, orderBy: 'id', order: 'asc', totalItems: 10};
    professors?: Professor[];
    availablePageSizes = [3,5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    format: string = 'dd/MM/yyyy';

    constructor(
        private httpCity: HttpCityService,
        private httpProfessor: HttpProfessorService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadCities();
        this.loadProfessors();
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

    loadCities() {
     this.httpCity.getAll().subscribe(
            cities => cities.forEach(city => this.cityMap.set(city.postalCode,city))
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
        console.log(sortEvent,'sortEvent');

        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            }
        )
        this.currentPage = {page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0};
        this.loadProfessors();
    }
}