import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamPeriod } from '../models';
import { Page, PageResponse } from '../models/dtos';

@Injectable({
    providedIn: 'root'
})

export class HttpExamPeriodService {


    endpointPrefix = 'examperiod';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<ExamPeriod>>(`${this.endpointBasePath}/page`, { params });

    }

    getAll(): Observable<ExamPeriod[]> {
        return this.httpClient.get<ExamPeriod[]>(`${this.endpointBasePath}`);

    }



    get(id: number): Observable<ExamPeriod> {
        return this.httpClient.get<ExamPeriod>(`${this.endpointBasePath}/${id}`);
    }

    post(examPeriod: ExamPeriod): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, examPeriod);
    }

    put(examPeriod: ExamPeriod): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${examPeriod.id}`, examPeriod);
    }

    delete(id: number): Observable<Response> {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }
    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}