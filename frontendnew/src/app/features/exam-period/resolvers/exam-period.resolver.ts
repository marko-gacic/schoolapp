import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ExamPeriod } from "src/app/core/models";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";


@Injectable({
    providedIn: "root",
})
export class ExamPeriodResolver implements Resolve<ExamPeriod> {

    constructor(
        private httpExamPeriodService: HttpExamPeriodService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExamPeriod> {
        const id = Number(route.paramMap.get('id'));
        return this.httpExamPeriodService.get(id);
    }
}