import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorFormComponent } from './pages/professor-form/professor-form.component';
import { ProfessorListComponent } from './pages/professor-list/professor-list.component';
import { ProfessorResolver } from './resolvers/professor.resolver';



const routes: Routes = [
    {path : 'professor-list', component: ProfessorListComponent},
    {path : 'professor-form', component: ProfessorFormComponent},
    {path : 'professor-form/:id', component: ProfessorFormComponent, resolve: {professor: ProfessorResolver}},
    {path : '', pathMatch: 'full', redirectTo: 'professor-list'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfessorRoutingModule { }