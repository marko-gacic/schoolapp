import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Literature } from "src/app/core/models";
import { HttpLiteratureService } from "src/app/core/services/http-literature.service";

@Injectable({
    providedIn: "root",
})
export class LiteratureResolver implements Resolve<Literature> {

    constructor(
        private httpLiteratureService: HttpLiteratureService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Literature> {
        const id = Number(route.paramMap.get('id'));
        return this.httpLiteratureService.getLiterature(id);
    }
}