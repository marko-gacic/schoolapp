import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LiteratureFormComponent } from "./pages/literature-form/literature-form.component";
import { LiteratureListComponent } from "./pages/literature-list/literature-list.component";
import { LiteratureResolver } from "./resolvers/literature.resolver";

const routes: Routes = [
    { path: 'literature-list', component: LiteratureListComponent },
    { path: 'literature-form', component: LiteratureFormComponent },
    { path: 'literature-form/:id', component: LiteratureFormComponent, resolve: { literature: LiteratureResolver } },
    { path: '', pathMatch: 'full', redirectTo: 'literature-list' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LiteratureRoutingModule { }