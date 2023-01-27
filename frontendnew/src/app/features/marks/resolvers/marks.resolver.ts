import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Marks } from "src/app/core/models";
import { HttpMarksService } from "src/app/core/services/http-marks.service";

@Injectable({
    providedIn: "root"
})


export class MarksResolver implements Resolve<Marks> {

    constructor(
        private httpMarksService: HttpMarksService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Marks> {
        const id = Number(route.paramMap.get('id'));
        return this.httpMarksService.getMarks(id);
    }
}