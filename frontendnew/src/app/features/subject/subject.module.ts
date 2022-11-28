import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { SubjectFormComponent } from "./pages/subject-form/subject-form.component";
import { SubjectListComponent } from "./pages/subject-list/subject-list.component";
import { SubjectRoutingModule } from "./subject-routing.module";

@NgModule({
    declarations: [
        SubjectFormComponent,
        SubjectListComponent
    ],
    imports: [
        CommonModule,
        SubjectRoutingModule,
        SharedModule
    ]
})
export class SubjectModule { }