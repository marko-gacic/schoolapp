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

    getProfessor(id: number) {
        return this.httpClient.get<ProfessorDTO>(`${this.endpointBasePath}/${id}`);
    }

    postProfessor(professor: ProfessorDTO): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, professor);
    }

    putProfessor(professor: ProfessorDTO): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${professor.id}`, professor);
    }

    deleteProfessor(id: number) {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }

    getAllProfessors() {
        return this.httpClient.get<Professor[]>(`${this.endpointBasePath}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }
}
