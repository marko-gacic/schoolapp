import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Professor, Literature } from 'src/app/core/models';
import { HttpLiteratureService } from 'src/app/core/services/http-literature.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-literature-form',
  templateUrl: './literature-form.component.html',
  styleUrls: ['./literature-form.component.css']
})
export class LiteratureFormComponent implements OnInit {
  literatureForm?: FormGroup;
  professors$?: Observable<Professor[]>;


  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpProfessor: HttpProfessorService,
    private httpLiterature: HttpLiteratureService,

  ) {
    const literature = this.activatedRoute.snapshot.data['literature']
    this.buildForm(literature);
  }

  ngOnInit(): void {
    this.loadProfessors();

  }

  buildForm(literature?: Literature) {
    this.literatureForm = this.formBuilder.group({
      id: [literature?.id],
      name: [literature?.name, [Validators.required]],
      authors: [literature?.authors, [Validators.required]],
      professor: [literature?.professor, [Validators.required]],
      fileName: [literature?.fileName, [Validators.required]],


    });
  }

  loadProfessors() {
    this.professors$ = this.httpProfessor.getAllProfessors();
  }


  saveLiterature() {
    const literature = this.literatureForm?.getRawValue();
    if (literature.id) {
      return this.httpLiterature.postLiterature(literature);
    } else {
      return this.httpLiterature.putLiterature(literature);
    }
  }

  onSave() {
    this.saveLiterature().pipe(take(1)).subscribe((message: any) => {
      this.toastService.showToast({
        message: 'message',
        header: 'Exam',
        classNames: 'bg-success',
      });
      this.router.navigate(['./literature/literature-list'], {
        queryParamsHandling: 'preserve'
      });

    });

  }

  onCancel() {
    this.router.navigate(['./literature/literature-list'], {
      queryParamsHandling: 'preserve'
    });
  }

  //save fileName as pdf file

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.literatureForm?.get('fileName')?.setValue(file);
    }
  }





}
