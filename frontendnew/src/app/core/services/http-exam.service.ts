import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exam, ExamPeriod, ExamPeriodDTO, Professor, Sub } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: 'root'
})

export class HttpExamService {

    endpointPrefix = 'exam';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Exam>>(`${this.endpointBasePath}/page`, { params });

    }

    getAll(): Observable<Exam[]> {
        return this.httpClient.get<Exam[]>(`${this.endpointBasePath}`);

    }

    getAllProfessor(): Observable<Professor[]> {
        return this.httpClient.get<Professor[]>(`${this.endpointBasePath}/professor`);
    }

    getAllSubject(): Observable<Sub[]> {
        return this.httpClient.get<Sub[]>(`${this.endpointBasePath}/subject`);
    }

    getAllExamPeriod(): Observable<ExamPeriodDTO[]> {
        return this.httpClient.get<ExamPeriodDTO[]>(`${this.endpointBasePath}/examPeriod`);
    }

    get(id: number): Observable<Exam> {
        return this.httpClient.get<Exam>(`${this.endpointBasePath}/${id}`);
    }

    post(exam: Exam): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, exam);
    }

    put(exam: Exam): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${exam.id}`, exam);
    }

    deleteExam(id: number): Observable<Response> {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }
    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}