import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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

    subjectForm!: FormGroup;
    submitted = false;
    title = 'formValidation'

    constructor(
        private formBuilder: FormBuilder,
        private httpSubject: HttpSubjectService,
        private toastService: ToastService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        const subject = this.route.snapshot.data['subject'];

    }

    ngOnInit(): void {
        this.subjectForm = this.formBuilder.group({

            id: new FormControl(''),
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern('[a-zA-Z ]*')]),
            description: new FormControl('', [Validators.minLength(3), Validators.maxLength(200), Validators.pattern('[a-zA-Z ]*')]),
            noOfESP: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9 ]*')]),
            yearOfStudy: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern('[0-9]*')]),
            semester: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),

        });

        console.log(this.subjectForm.valid);

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
        this.submitted = true;
        this.saveSubject()
            .pipe(take(1))
            .subscribe((message: any) => {
                this.toastService.showToast({
                    header: ('SUBJECT.SAVING_SUBJECT_HEADER'),
                    message: ('SUBJECT.SAVING_SUBJECT_MESSAGE'),
                    classNames: 'bg-success',
                });
                this.router.navigate(['/subject/subject-list'], {
                    queryParamsHandling: 'preserve',
                });
            });


    }
}