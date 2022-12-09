import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { City, Professor } from 'src/app/core/models';
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { ToastService } from "src/app/core/services/toast.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "app-professor-form",
    templateUrl: "./professor-form.component.html",
    styleUrls: ["./professor-form.component.css"]
})
export class ProfessorFormComponent implements OnInit {
    professorForm?: FormGroup;
    cities$?: Observable<City[]>;

    constructor(
        private httpProfessor: HttpProfessorService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        private httpCity: HttpCityService,
        private translate: TranslateService
    ) {
        const professor = this.activatedRoute.snapshot.data['professor'];
        this.buildForm(professor);
    }
    ngOnInit(): void {
        this.loadCities();
    }

    buildForm(professor?: Professor) {
        this.professorForm = this.formBuilder.group({
            id: [professor?.id],
            firstName: [professor?.firstName, Validators.required],
            lastName: [professor?.lastName, Validators.required],
            email: [professor?.email, Validators.required],
            address: [professor?.address, Validators.required],
            phone: [professor?.phone, Validators.required],
            relocationDate: [professor?.relocationDate, Validators.required],
            city: [professor?.city, Validators.required]
        });
    }

    loadCities() {
        this.cities$ = this.httpCity.getAll();
    }

    saveProfessor() {
        const professor = this.professorForm?.getRawValue();
        if (!professor.id) {
            return this.httpProfessor.post(professor)
        } else {
            return this.httpProfessor.put(professor);
        }
    }

    onSave() {
        this.saveProfessor().pipe(take(1)).subscribe((message: any) => {
            this.toastService.showToast({
                message: this.translate.instant('PROFESSOR.SAVING_PROFESSOR_MESSAGE'),
                header: this.translate.instant('PROFESSOR.SAVING_PROFESSOR_HEADER'),
                classNames: 'bg-success'
            });
            this.router.navigate(['/professor/professor-list'], {
                queryParamsHandling: 'preserve'
            });
        });
    }
}