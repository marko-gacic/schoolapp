import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Professor, ProfessorDTO } from '../models';
import { Page, PageResponse } from '../models/dtos';

@Injectable({
    providedIn: 'root'
})
export class HttpProfessorService {

    endpointPrefix = 'professor';

    constructor(private httpClient: HttpClient) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set('page', page.page)
            .set('size', page.size)
            .set('orderBy', page.orderBy)
            .set('order', page.order);

        return this.httpClient.get<PageResponse<Professor>>(`${this.endpointBasePath}/page`, { params });

    }

    get(id: number) {
        return this.httpClient.get<ProfessorDTO>(`${this.endpointBasePath}/${id}`);
    }

    post(professor: ProfessorDTO): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, professor);
    }

    put(professor: ProfessorDTO): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${professor.id}`, professor);
    }
    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }

    delete(id: number) {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }
}
