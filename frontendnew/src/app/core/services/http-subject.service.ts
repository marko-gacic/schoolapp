import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sub, SubDTO } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: "root",
})

export class HttpSubjectService {

    endpointPrefix = 'subject';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Sub>>(`${this.endpointBasePath}/page`, { params });

    }

    getSubject() {
        return this.httpClient.get<Sub[]>(`${this.endpointBasePath}`);
    }

    get(id: number) {
        return this.httpClient.get<SubDTO>(`${this.endpointBasePath}/${id}`);
    }

    getAll(): Observable<Sub[]> {
        return this.httpClient.get<Sub[]>(`${this.endpointBasePath}`);
    }

    post(sub: SubDTO): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, sub);
    }

    put(sub: SubDTO): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${sub.id}`, sub);
    }

    delete(id: number) {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}
