import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpExamService } from "src/app/core/services/http-exam.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';






@Component({
    selector: 'app-edit-exam-dialog',
    templateUrl: './edit-exam-dialog.component.html',
    styleUrls: ['./edit-exam-dialog.component.css']
})

export class EditExamDialogComponent implements OnInit {
    examForm = this.fb.group({
        id: [],
        subject: ['', Validators.required],
        professor: ['', Validators.required],
        date: ['', Validators.required],
        examPeriod: ['', Validators.required],
    });

    constructor(
        private examService: HttpExamService,
        private fb: FormBuilder = new FormBuilder(),
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        const { id, subject, professor, date, examPeriod } = this.data
        this.examForm.setValue({
            id, subject, professor, date, examPeriod
        })

    }

    onSubmit(form: any) {
        this.examService.put(form).subscribe(res => {
        })
        this.openSnackBar('Exam successfully updated!', 'Close')
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
        });
    }

    ngOnInit(): void { }

}