import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path:'student', 
  loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule) },
{ path:'professor', 
  loadChildren: () => import('./features/professor/professor.module').then(m => m.ProfessorModule) },
{ path: '', pathMatch: 'full', redirectTo: '/login' },
{path: 'city',
loadChildren: () => import('./features/city/city.module').then(m => m.CityModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
