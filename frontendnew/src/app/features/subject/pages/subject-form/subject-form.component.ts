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

    destroy$ = new Subject<boolean>();

    constructor(private activeRoute: ActivatedRoute,
                private fb: FormBuilder,
                private httpSubject: HttpSubjectService,
                private toastService: ToastService,
                private router: Router,
                ) {

        const sub = this.activeRoute.snapshot.data['sub'];
        this.buildForm(sub);

        this.destroy$.subscribe( value => console.log('Value from destroy ', value, new Date()))
    }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
    }

    buildForm(sub?: Sub) {
        this.subForm = this.fb.group({
            name: [sub?.name, Validators.required],
            description: [sub?.description, Validators.required],
            noOfESP: [sub?.noOfESP, Validators.required],
            yearOfStudy: [sub?.yearOfStudy, Validators.required],
            semester: [sub?.semester, Validators.required],
        })
    }

    saveSubject() {
        const sub = this.subForm?.getRawValue();
        if (!sub.id) {
            return this.httpSubject.updateSubject(sub);
        } else {
            return this.httpSubject.insertSubject(sub);
        }
    }

 onSave() {
  this.saveSubject().pipe(take(1)).subscribe((message: any) => {
    this.toastService.showToast(
        {
            message: message.message,
            classNames: 'bg-success ',
            header: 'Success',
        })
    this.router.navigate(['/subject/subject-list'],{queryParamsHandling: 'preserve'});
  })
 }
   
}





    