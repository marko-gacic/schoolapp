import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { StudentFormComponent } from "./pages/student-form/student-form.component";
import { StudentListComponent } from "./pages/student-list/student-list.component";
import { StudentRoutingModule } from "./student-routing.model";




@NgModule ({
    declarations: [
        StudentFormComponent,
        StudentListComponent
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        SharedModule
    ]
})
export class StudentModule { }