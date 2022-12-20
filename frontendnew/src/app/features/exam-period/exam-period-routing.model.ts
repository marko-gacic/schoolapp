import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPeriodFormComponent } from './pages/exam-period-form/exam-period-form.component';
import { ExamPeriodResolver } from './resolvers/exam-period.resolver';
import { ExamPeriodListComponent } from './pages/exam-period-list/exam-period-list.component';




const routes: Routes = [
    { path: 'exam-period-list', component: ExamPeriodListComponent },
    { path: 'exam-period-form', component: ExamPeriodFormComponent },
    { path: 'exam-period-form/:id', component: ExamPeriodFormComponent, resolve: { professor: ExamPeriodResolver } },
    { path: '', pathMatch: 'full', redirectTo: 'exam-period-form' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamPeriodRoutingModule { }