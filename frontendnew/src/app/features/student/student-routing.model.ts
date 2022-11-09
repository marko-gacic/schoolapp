
import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StudentFormComponent } from "./pages/student-form/student-form.component";
import { StudentListComponent } from "./pages/student-list/student-list.component";
import { StudentResolver } from "./resolvers/student.resolver";


const routes: Routes = [
    { path: 'student-list', component: StudentListComponent },
    { path: 'student-form', component: StudentFormComponent},
    { path: 'student-form/:id', component: StudentFormComponent, resolve: { student: StudentResolver } },
    { path: '', redirectTo: 'student-list', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }