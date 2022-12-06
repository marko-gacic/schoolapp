import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { Sub } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { ToastService } from "src/app/core/services/toast.service";



@Component({
    selector: 'app-subject-form',
    templateUrl: './subject-form.component.html',
    styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

    subjectForm?: FormGroup;

    constructor(
        private fb: FormBuilder,
        private httpSubject: HttpSubjectService,
        private toastService: ToastService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        const subject = this.route.snapshot.data['subject'];
        this.buildForm(subject);
    }

    ngOnInit(): void {
    }

    buildForm(subject?: Sub) {
        this.subjectForm = this.fb.group({
            id: [subject?.id],
            name: [subject?.name, Validators.required],
            description: [subject?.description, Validators.required],
            noOfESP: [subject?.noOfESP, Validators.required],
            yearOfStudy: [subject?.yearOfStudy, Validators.required],
            semester: [subject?.semester, Validators.required],

        });
    }

    saveSubject() {
        const subject = this.subjectForm?.getRawValue();
        if (!subject.id) {
            return this.httpSubject.post(subject);
        } else {
            return this.httpSubject.put(subject);
        }
    }

    onSave() {
        this.saveSubject()
            .pipe(take(1))
            .subscribe((message: any) => {
                this.toastService.showToast({
                    header: ('MANUFACTURER.SAVING_MANUFACTURER_HEADER'),
                    message: ('MANUFACTURER.SAVING_MANUFACTURER_MESSAGE'),
                    classNames: 'bg-success',
                });
                this.router.navigate(['/subject/subject-list'], {
                    queryParamsHandling: 'preserve',
                });
            });
    }
}