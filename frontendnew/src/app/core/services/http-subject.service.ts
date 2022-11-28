import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Sub } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: "root",
})

export class HttpSubjectService {

    endpointPrefix = 'subject';

    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<Sub[]>(`${this.endpointBasePath}`); //, { headers});
    }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Sub>>(`${this.endpointBasePath}/page`, { params });

    }

    deleteSubject(id: number) {
        return this.httpClient.delete<any>(`${this.endpointBasePath}/${id}`);
    }

    getSubject(id: number) {
        return this.httpClient.get<Sub>(`${this.endpointBasePath}/${id}`);
    }

    insertSubject(subject: Sub) {
        return this.httpClient.post<any>(`${this.endpointBasePath}`, subject);
    }

    updateSubject(subject: Sub) {
        return this.httpClient.put<any>(`${this.endpointBasePath}/${subject.id}`, subject);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}



