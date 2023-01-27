import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'student',
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'professor',
    loadChildren: () => import('./features/professor/professor.module').then(m => m.ProfessorModule),

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
  {
    path: 'literature',
    loadChildren: () => import('./features/literature/literature.module').then(m => m.LiteratureModule)
  },

  {
    path: 'marks',
    loadChildren: () => import('./features/marks/marks.module').then(m => m.MarksModule)
  },


  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: { title: 'User Profile' }
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
