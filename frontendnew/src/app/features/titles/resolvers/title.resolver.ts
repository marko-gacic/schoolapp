import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Title } from 'src/app/core/models';
import { HttpTitleService } from 'src/app/core/services/http-title.service';

@Injectable({
    providedIn: 'root'
})
export class TitleResolver implements Resolve<Title> {

    constructor(private httpTitle: HttpTitleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Title> {

        const id = Number(route.paramMap.get('id'));
        console.log('TitleResolver: ', id);
        return this.httpTitle.getTitle(id);
    }
}
