import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Literature } from "../models";
import { Page, PageResponse } from "../models/dtos";

@Injectable({
    providedIn: "root"
})
export class HttpLiteratureService {
    static create(literatureData: any) {
        throw new Error('Method not implemented.');
    }
    endpointPrefix = "literature";

    constructor(private httpClient: HttpClient) { }


    getByPage(page: Page) {
        const params = new HttpParams()
            .set("page", page.page.toString())
            .set("size", page.size.toString())
            .set("orderBy", page.orderBy)
            .set("order", page.order);

        return this.httpClient.get<PageResponse<Literature>>(`${this.endpointBasePath}/page`, { params });
    }

    getLiterature(id: number): Observable<Literature> {
        return this.httpClient.get<Literature>(`${this.endpointBasePath}/${id}`);
    }

    postLiterature(literature: Literature): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, literature);
    }

    putLiterature(literature: Literature): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${literature.id}`, literature);
    }

    deleteLiterature(id: number): Observable<Response> {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }

    getAllLiteratures(): Observable<Literature[]> {
        return this.httpClient.get<Literature[]>(`${this.endpointBasePath}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }

    downloadFile(id: string): Observable<Blob> {
        return this.httpClient.get(`${this.endpointBasePath}/${id}`, { responseType: 'blob' });
    }


}
