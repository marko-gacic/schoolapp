import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { City } from 'src/app/core/models';
import { HttpCityService } from 'src/app/core/services/http-city.service';

@Injectable({
  providedIn: 'root'
})
export class CityResolver implements Resolve<City> {

  constructor(private httpCity: HttpCityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<City> {

    const zipCode = Number(route.paramMap.get('zipCode'));
    console.log('CityResolver: ', zipCode);
    return this.httpCity.getCity(zipCode);
  }
}
