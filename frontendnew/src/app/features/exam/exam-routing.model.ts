import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamFormComponent } from './pages/exam-form/exam-form.component';
import { ExamResolver } from './resolvers/exam.resolver';





const routes: Routes = [
    { path: 'exam-form', component: ExamFormComponent },
    { path: 'exam-form/:id', component: ExamFormComponent, resolve: { exam: ExamResolver } },
    { path: '', pathMatch: 'full', redirectTo: 'exam-form' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamRoutingModule { }