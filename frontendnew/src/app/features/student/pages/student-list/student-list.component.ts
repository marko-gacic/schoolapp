import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { City, Student } from "src/app/core/models";
import { Page } from "src/app/core/models/dtos";
import { ConfirmOptions } from "src/app/core/models/enums";
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpStudentService } from "src/app/core/services/http-student.service";
import { ToastService } from "src/app/core/services/toast.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { SortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable-header.directive';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
    cityMap: Map<number, City> = new Map;
    currentPage: Page = { page: 1, size: 5, orderBy: 'name', order: 'asc', totalItems: 10 };
    students?: Student[];
    availablePageSizes = [3, 5, 10, 15, 20, 25, 30, 50, 100];
    @ViewChildren(SortableHeaderDirective)
    sortableHeaders?: QueryList<SortableHeaderDirective>;
    selectedStudent?: Student;
    subscriptions = new Subscription();
    allStudent$?: Observable<Student[]>;
    searchTerm: string = '';

    constructor(
        private httpCity: HttpCityService,
        private httpStudent: HttpStudentService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private toastService: ToastService
    ) { }


    ngOnInit(): void {
        this.loadPageFromQueryParams();
        this.loadCities();
        this.loadStudents();
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
        console.log(sortEvent, 'sortEvent');

        this.sortableHeaders?.forEach(
            sortableHeader => {
                if (sortableHeader.sortable !== sortEvent.columnName) {
                    sortableHeader.direction = '';
                }
            }
        )
        this.currentPage = { page: 1, size: this.currentPage.size, orderBy: sortEvent.columnName, order: sortEvent.direction, totalItems: 0 };
        this.loadStudents();
    }

    search() {
        this.students = this.students?.filter(student => {
            return student.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        })
    }

    onDeleteClick(student: Student) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.header = 'Delete Student';
        modalRef.componentInstance.message = `Are you sure you want to delete ${student.firstName}?`;
        modalRef.result.then(
            (result) => (result === ConfirmOptions.YES) && (this.deleteStudent(student))

        );
    }

    deleteStudent(student: Student) {
        const subscription = this.httpStudent.delete(student.id).subscribe(
            {
                next: (response) => {
                    this.toastService.showToast({ header: 'Deleting Student', message: 'Student Deleted', delay: 2000, classNames: 'bg-success' });
                    this.loadStudents();
                },
                error: (error) => {
                    this.toastService.showToast({ header: 'Deleting Student', message: 'Error Deleting Student', delay: 2000, classNames: 'bg-danger' });
                }
            }
        );
        this.subscriptions.add(subscription);
    }

    onDetailsClick(student: Student, studentDetailsTemplate: TemplateRef<any>) {
        this.selectedStudent = student;
        this.modalService.open(studentDetailsTemplate);
    }


    get tempContext() {
        return { number: 10 }
    }
}