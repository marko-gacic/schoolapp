import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Student, StudentDTO } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: 'root'
})
export class HttpStudentService {

    endpointPrefix = 'student';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Student>>(`${this.endpointBasePath}/page`, { params });

    }

    getAllStudents() {
        return this.httpClient.get<Student[]>(`${this.endpointBasePath}`);
    }

    get(id: number) {
        return this.httpClient.get<StudentDTO>(`${this.endpointBasePath}/${id}`);
    }

    post(student: StudentDTO): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, student);
    }

    put(student: StudentDTO): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${student.id}`, student);
    }

    delete(id: number) {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }

    filterData(filter: string) {
        return this.httpClient.get<Student[]>(`${this.endpointBasePath}/filter/${filter}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}