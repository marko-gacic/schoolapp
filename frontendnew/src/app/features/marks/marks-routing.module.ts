import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MarksFormComponent } from "./pages/marks-form/marks-form.component";
import { MarksListComponent } from "./pages/marks-list/marks-list.component";
import { MarksResolver } from "./resolvers/marks.resolver";


const routes: Routes = [
    { path: 'marks-list', component: MarksListComponent },
    { path: 'marks-form', component: MarksFormComponent },
    { path: 'marks-form/:id', component: MarksFormComponent, resolve: { marks: MarksResolver } },
    { path: '', pathMatch: 'full', redirectTo: 'marks-list' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarksRoutingModule { }