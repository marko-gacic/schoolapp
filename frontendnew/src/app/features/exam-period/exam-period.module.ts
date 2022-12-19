import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from "src/app/shared/shared.module";
import { ExamPeriodFormComponent } from './pages/exam-period-form/exam-period-form.component';
import { EditExamPeriodDialogComponent } from './pages/exam-period-form/dialogs/exam-period-dialog/edit-exam-period-dialog.component';
import { ExamPeriodListComponent } from './pages/exam-period-list/exam-period-list.component';
import { ExamPeriodRoutingModule } from './exam-period-routing.model';
;




@NgModule({
    declarations: [
        ExamPeriodFormComponent,
        EditExamPeriodDialogComponent,
        ExamPeriodListComponent

    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ExamPeriodRoutingModule
    ]
})
export class ExamPeriodModule { }
