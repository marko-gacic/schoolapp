import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { SubDTO } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";







@Injectable({
    providedIn: "root",
})
export class SubjectResolver implements Resolve<SubDTO> {

    constructor(
        private httpSubjectService: HttpSubjectService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubDTO> {
        const id = Number(route.paramMap.get('id'));
        return this.httpSubjectService.get(id);
    }
}