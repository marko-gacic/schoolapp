import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, take, takeUntil } from "rxjs";
import { Sub } from "src/app/core/models";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
    selector: 'app-subject-form',
    templateUrl: './subject-form.component.html',
    styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit, OnDestroy {

    subForm?: FormGroup;
    sub?: Sub;

    destroy$ = new Subject<boolean>();

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private httpSubject: HttpSubjectService,
        private toastService: ToastService,
        private router: Router,
    ) {

        this.sub = this.activeRoute.snapshot.data['sub'];
        this.destroy$.subscribe(value => console.log('Value from destroy ', value, new Date()))

    }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
    }

    buildForm() {
        this.subForm = this.formBuilder.group({
            id: [this.sub?.id],
            name: [this.sub?.name, Validators.required],
            description: [this.sub?.description, Validators.required],
            noOfESP: [this.sub?.noOfESP, Validators.required],
            yearOfStudy: [this.sub?.yearOfStudy, Validators.required],
            semester: [this.sub?.semester, Validators.required],
        })
    }

    saveSubject() {
        const sub = this.subForm?.getRawValue();
        if (!sub.id) {
            return this.httpSubject.create(sub);
        } else {
            return this.httpSubject.update(sub);
        }
    }

    onSave() {
        if (!this.subForm) return;

        this.saveSubject()
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(
                (message: any) => {
                    this.toastService.showToast(
                        {
                            header: 'Success',
                            message: message.message,
                            classNames: 'bg-success'

                        })
                    this.router.navigate(['/subject/subject-list'], {
                        queryParamsHandling: 'preserve'
                    });
                })
    }
}





