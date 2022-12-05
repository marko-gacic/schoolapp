import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectFormComponent } from './pages/subject-form/subject-form.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectResolver } from './resolvers/subject.resolver';

const routes: Routes = [
    { path: 'subject-list', component: SubjectListComponent },
    { path: 'subject-form', component: SubjectFormComponent },
    { path: 'subject-form/:id', component: SubjectFormComponent, resolve: { subject: SubjectResolver } },
    { path: '', redirectTo: 'subject-list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubjectRoutingModule { }

