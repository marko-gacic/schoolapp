import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityFormComponent } from './pages/city-form/city-form.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CityResolver } from './resolvers/city.resolver';

const routes: Routes = [
  {path: 'city-list', component: CityListComponent},
  {path: 'city-form/:zipCode', component: CityFormComponent, resolve: {city: CityResolver}},
  {path: 'city-form', component: CityFormComponent},
  {path: '', pathMatch:'full', redirectTo:'city-list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
