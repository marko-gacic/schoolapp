import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ProfessorFormComponent } from "./pages/professor-form/professor-form.component";
import { ProfessorListComponent } from "./pages/professor-list/professor-list.component";
import { ProfessorRoutingModule } from "./professor-routing.module";




@NgModule({
    declarations: [
        ProfessorFormComponent,
        ProfessorListComponent
    ],
    imports: [
        CommonModule,
        ProfessorRoutingModule,
        SharedModule
    ]
})
export class ProfessorModule { }