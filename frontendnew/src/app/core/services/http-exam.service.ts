import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Exam } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: 'root'
})
export class HttpExamService {
    endpointPrefix = 'exam';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page): Observable<PageResponse<Exam>> {
        const params = new HttpParams()
            .set('page', page.page.toString())
            .set('size', page.size.toString())
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Exam>>(`${this.endpointBasePath}/page`, { params });
    }

    getAll(): Observable<Exam[]> {
        return this.httpClient.get<Exam[]>(`${this.endpointBasePath}`);
    }

    get(id: number): Observable<Exam> {
        return this.httpClient.get<Exam>(`${this.endpointBasePath}/${id}`);
    }

    post(exam: Exam): Observable<any> {
        return this.httpClient.post<any>(`${this.endpointBasePath}`, exam);
    }

    put(exam: Exam): Observable<any> {
        return this.httpClient.put<any>(`${this.endpointBasePath}/${exam.id}`, exam);
    }

    deleteExam(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.endpointBasePath}/${id}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}
