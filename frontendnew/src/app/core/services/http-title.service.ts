import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '../models';
import { Page, PageResponse } from '../models/dtos';

@Injectable({
    providedIn: 'root'
})
export class HttpTitleService {

    endpointPrefix = 'title';

    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<Title[]>(`${this.endpointBasePath}`); //, { headers});
    }


    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Title>>(`${this.endpointBasePath}/page`, { params });

    }

    deleteTitle(titleId: number) {
        return this.httpClient.delete<any>(`${this.endpointBasePath}/${titleId}`);
    }

    getTitle(titleId: number) {
        return this.httpClient.get<Title>(`${this.endpointBasePath}/${titleId}`);
    }

    insertTitle(title: Title) {
        return this.httpClient.post<any>(`${this.endpointBasePath}`, title);
    }

    updateTitle(oldTitleId: number, title: Title) {
        return this.httpClient.put<any>(`${this.endpointBasePath}/${oldTitleId}`, title);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}
