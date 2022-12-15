import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleFormComponent } from './pages/title-form/title-form.component';
import { TitleListComponent } from './pages/title-list/title-list.component';
import { TitleResolver } from './resolvers/title.resolver';

const routes: Routes = [
    { path: 'title-list', component: TitleListComponent },
    { path: 'title-form/:id', component: TitleFormComponent, resolve: { title: TitleResolver } },
    { path: 'title-form', component: TitleFormComponent },
    { path: '', pathMatch: 'full', redirectTo: 'title-list' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TitleRoutingModule { }