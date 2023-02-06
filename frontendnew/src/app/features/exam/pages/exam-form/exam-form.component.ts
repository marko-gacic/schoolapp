import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, take } from "rxjs";
import { Exam, ExamPeriod, Professor, Sub, } from "src/app/core/models";
import { HttpExamService } from "src/app/core/services/http-exam.service";
import { HttpExamPeriodService } from "src/app/core/services/http-examperiod.service";
import { HttpProfessorService } from "src/app/core/services/http-professor.service";
import { HttpSubjectService } from "src/app/core/services/http-subject.service";
import { ToastService } from "src/app/core/services/toast.service";




@Component({
    selector: 'app-exam-form',
    templateUrl: './exam-form.component.html',
    styleUrls: ['./exam-form.component.css']
})

export class ExamFormComponent implements OnInit {
    examForm?: FormGroup;
    subjects$?: Observable<Sub[]>;
    professors$?: Observable<Professor[]>;
    examPeriods$?: Observable<ExamPeriod[]>;

    constructor(
        private httpExam: HttpExamService,
        private httpProfessor: HttpProfessorService,
        private httpSub: HttpSubjectService,
        private httpExamPeriod: HttpExamPeriodService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private router: Router,
        private activatedRoute: ActivatedRoute,

    ) {
        const exam = this.activatedRoute.snapshot.data['exam']
        this.buildForm(exam);
    }

    ngOnInit(): void {
        this.loadSubjects();
        this.loadProfessors();
        this.loadExamPeriods();

    }

    buildForm(exam?: Exam) {
        this.examForm = this.formBuilder.group({
            id: [exam?.id],
            subject: [exam?.subject, [Validators.required]],
            professor: [exam?.professor, [Validators.required]],
            date: [exam?.date, [Validators.required]],
            examPeriod: [exam?.examPeriod, [Validators.required]],

        });
    }

    loadSubjects() {
        this.subjects$ = this.httpSub.getAll();

    }

    loadProfessors() {
        this.professors$ = this.httpProfessor.getAllProfessors();

    }

    loadExamPeriods() {
        this.examPeriods$ = this.httpExamPeriod.getAll();
    }

    saveExam() {
        const exam = this.examForm?.getRawValue();
        return !exam.id ? this.httpExam.post(exam) : this.httpExam.put(exam);
    }

    onSave() {
        this.saveExam().subscribe(message => {
            this.toastService.showToast({
                message: 'message',
                header: 'Exam',
                classNames: 'bg-success',
            });
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
    }

}



