import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'student',
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'professor',
    loadChildren: () => import('./features/professor/professor.module').then(m => m.ProfessorModule)
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'city',
    loadChildren: () => import('./features/city/city.module').then(m => m.CityModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: 'exam-period',
    loadChildren: () => import('./features/exam-period/exam-period.module').then(m => m.ExamPeriodModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./features/exam/exam.module').then(m => m.ExamModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
