import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, takeUntil, zip } from 'rxjs';
import { Title } from 'src/app/core/models';
import { HttpTitleService } from 'src/app/core/services/http-title.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-title-form',
    templateUrl: './title-form.component.html',
    styleUrls: ['./title-form.component.css']
})

export class TitleFormComponent implements OnInit, OnDestroy {

    title?: Title;
    titleForm?: FormGroup;

    destroy$ = new Subject<boolean>();

    constructor(
        private httpTitle: HttpTitleService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
    ) {
        this.title = this.activatedRoute.snapshot.data['title'];

        this.destroy$.subscribe(value => console.log('destroy$ value: ', value));

    }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    buildForm() {
        this.titleForm = this.formBuilder.group({
            id: new FormControl(''),
            name: new FormControl('', [Validators.required]),
        });
    }

    saveTitle(title: Title, id?: number) {
        if (this.title && id) {
            return this.httpTitle.updateTitle(id, title);
        } else {
            return this.httpTitle.insertTitle(title);
        }
    }

    onSave() {
        if (!this.titleForm) return;

        this.saveTitle(this.titleForm.value, this.title?.id)
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
                        }
                    );
                    this.router.navigate(['/title/tile-list'], {
                        queryParamsHandling: 'preserve'
                    });
                }
            );
    }

}
