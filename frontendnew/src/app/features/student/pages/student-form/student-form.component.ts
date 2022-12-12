import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, take } from "rxjs";
import { City, Student } from "src/app/core/models";
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpStudentService } from "src/app/core/services/http-student.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
    studentForm?: FormGroup;
    cities$?: Observable<City[]>;
    constructor(
        private httpStudent: HttpStudentService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        private httpCity: HttpCityService
    ) {
        const student = this.activatedRoute.snapshot.data['student'];
        this.buildForm(student);
    }
    ngOnInit(): void {
        this.loadCities();
    }
    buildForm(student?: Student) {
        this.studentForm = this.formBuilder.group({

            id: new FormControl(''),
            indexNumber: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]),
            indexYear: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*'), Validators.min(2000), Validators.max(2100)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')]),
            email: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl('', [Validators.required, Validators.minLength(3)]),
            currentYearOfStudy: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
            city: new FormControl('', [Validators.required]),
        });

    }

    loadCities() {
        this.cities$ = this.httpCity.getAll();
    }
    saveStudent() {
        const student = this.studentForm?.getRawValue();
        if (!student.id) {
            return this.httpStudent.post(student)
        } else {
            return this.httpStudent.put(student);
        }
    }
    onSave() {
        this.saveStudent().pipe(take(1)).subscribe((message: any) => {
            this.toastService.showToast(
                {
                    message: message.message,
                    classNames: 'bg-success',
                    header: 'Success',
                });
            this.router.navigate(['/student/student-list'], {
                queryParamsHandling: 'preserve'
            });
        });
    }
}