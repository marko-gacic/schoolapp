import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { StudentDTO } from "src/app/core/models";
import { HttpStudentService } from "src/app/core/services/http-student.service";

@Injectable ({
    providedIn: "root",
})
export class StudentResolver implements Resolve <StudentDTO> {

    constructor(private httpStudent: HttpStudentService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentDTO> {
        const id = Number (route.paramMap.get ("id"));
        return this.httpStudent.get (id);
    }
}