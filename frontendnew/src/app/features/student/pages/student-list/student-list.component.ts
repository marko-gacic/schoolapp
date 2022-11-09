import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { City, Student } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpStudentService } from "src/app/core/services/http-student.service";
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component ({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
    cityMap: Map<number, City> = new Map;
    currentPage: Page = {page:1, size: 5, orderBy: 'id', order: 'asc', totalItems: 10};
    students?: Student[];
    availablePageSizes = [3,5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    
        constructor(
            private httpCity: HttpCityService,
            private httpStudent: HttpStudentService,
            private activatedRoute: ActivatedRoute,
        ) {}
       
    
        ngOnInit(): void {
            this.loadPageFromQueryParams();
            this.loadCities();
            this.loadStudents();
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
            );
        }

        loadStudents() {
            this.httpStudent.getByPage(this.currentPage).subscribe(
                studentsPage => {
                    this.students = studentsPage.content;
                    this.currentPage.page = studentsPage.page;
                    this.currentPage.totalItems = studentsPage.totalItems;
                }
            );
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
            this.loadStudents();
        }
    
}