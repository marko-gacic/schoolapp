import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { City, Professor, Title } from 'src/app/core/models';
import { HttpCityService } from "src/app/core/services/http-city.service";
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { ToastService } from "src/app/core/services/toast.service";
import { TranslateService } from '@ngx-translate/core';
import { HttpTitleService } from "src/app/core/services/http-title.service";



@Component({
    selector: "app-professor-form",
    templateUrl: "./professor-form.component.html",
    styleUrls: ["./professor-form.component.css"]
})
export class ProfessorFormComponent implements OnInit {
    professorForm?: FormGroup;
    cities$?: Observable<City[]>;
    titles$?: Observable<Title[]>;


    constructor(
        private httpProfessor: HttpProfessorService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        private httpCity: HttpCityService,
        private translate: TranslateService,
        private httpTitle: HttpTitleService
    ) {
        const professor = this.activatedRoute.snapshot.data['professor'];
        this.buildForm(professor);
    }
    ngOnInit(): void {
        this.loadCities();
        this.loadTitles();



    }

    buildForm(professor?: Professor) {
        this.professorForm = this.formBuilder.group({
            id: [professor?.id],
            firstName: [professor?.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')],],
            lastName: [professor?.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')],],
            title: [professor?.title, [Validators.required],],
            email: [professor?.email, [Validators.required, Validators.email],],
            address: [professor?.address, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')],],
            phone: [professor?.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(30)],],
            relocationDate: [professor?.relocationDate, [Validators.required],],
            city: [professor?.city, [Validators.required],],
        });
    }

    loadCities() {
        this.cities$ = this.httpCity.getAll();
    }

    loadTitles() {
        this.titles$ = this.httpTitle.getAll();
    }

    saveProfessor() {
        const professor = this.professorForm?.getRawValue();
        if (!professor.id) {
            return this.httpProfessor.postProfessor(professor)
        } else {
            return this.httpProfessor.putProfessor(professor);
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