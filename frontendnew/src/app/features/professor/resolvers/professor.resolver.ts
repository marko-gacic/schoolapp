import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProfessorDTO } from "src/app/core/models";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";



@Injectable({
    providedIn: "root",
})
export class ProfessorResolver implements Resolve<ProfessorDTO> {

    constructor (
        private httpProfessorService: HttpProfessorService) {}
    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<ProfessorDTO> {
    const id = Number(route.paramMap.get('id'));
    return this.httpProfessorService.get(id);
    }
}