import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Exam } from "src/app/core/models";
import { HttpExamService } from "src/app/core/services/http-exam.service";





@Injectable({
    providedIn: "root",
})

export class ExamResolver implements Resolve<Exam> {

    constructor(
        private httpExamService: HttpExamService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exam> {
        const id = Number(route.paramMap.get('id'));
        return this.httpExamService.get(id);
    }
}