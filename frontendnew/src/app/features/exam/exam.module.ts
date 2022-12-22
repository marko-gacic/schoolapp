import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "src/app/shared/shared.module";
import { ExamRoutingModule } from "./exam-routing.model";
import { EditExamDialogComponent } from "./pages/exam-form/dialogs/exam-edit-dialog/edit-exam-dialog.component";
import { ExamFormComponent } from "./pages/exam-form/exam-form.component";










@NgModule({
    declarations: [
        ExamFormComponent,
        EditExamDialogComponent,

    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ExamRoutingModule
    ]
})
export class ExamModule { }
