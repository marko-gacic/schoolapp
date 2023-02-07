import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Marks } from "../models";
import { Page, PageResponse } from "../models/dtos";


@Injectable({
    providedIn: "root"
})
export class HttpMarksService {

    endpointPrefix = "marks";

    constructor(
        private httpClient: HttpClient
    ) { }

    getByPage(page: Page) {

        const params = new HttpParams()
            .set("page", page.page)
            .set("size", page.size)
            .set("orderBy", page.orderBy)
            .set("order", page.order);

        return this.httpClient.get<PageResponse<Marks>>(`${this.endpointBasePath}/page`, { params });

    }

    getMarks(id: number) {
        return this.httpClient.get<Marks>(`${this.endpointBasePath}/${id}`);
    }

    postMarks(marks: Marks): Observable<Response> {
        return this.httpClient.post<Response>(`${this.endpointBasePath}`, marks);
    }

    putMarks(marks: Marks): Observable<Response> {
        return this.httpClient.put<Response>(`${this.endpointBasePath}/${marks.id}`, marks);
    }

    deleteMarks(id: number) {
        return this.httpClient.delete<Response>(`${this.endpointBasePath}/${id}`);
    }

    getAllMarks() {
        return this.httpClient.get<Marks[]>(`${this.endpointBasePath}`);
    }

    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }



}