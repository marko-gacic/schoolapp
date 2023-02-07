import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  literatureForm!: FormGroup;
  professors$!: Observable<Professor[]>;

  @ViewChild('fileName', { static: false }) fileName?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpProfessor: HttpProfessorService,
    private httpLiterature: HttpLiteratureService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadProfessors();
    this.buildForm(this.activatedRoute.snapshot.data['literature']);
  }

  buildForm(literature?: Literature) {
    this.literatureForm = this.formBuilder.group({
      id: [literature?.id],
      name: [literature?.name, [Validators.required]],
      authors: [literature?.authors, [Validators.required]],
      issn: [literature?.issn, [Validators.required]],
      professor: [literature?.professor, [Validators.required]],
      fileName: [literature?.fileName, [Validators.required]],
    });
  }

  loadProfessors() {
    this.professors$ = this.httpProfessor.getAllProfessors();
  }

  onSave() {
    const literature = this.literatureForm?.getRawValue();
    const file = this.literatureForm?.get('fileName')?.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('literature', JSON.stringify(literature));
    this.httpLiterature.postLiterature(literature).subscribe((message: any) => {
      this.toastService.showToast({
        message: 'Literature saved successfully',
        header: 'Literature',
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

  onFileSelected(event: any) {
    const file = event.target
    if (file.files.length > 0) {
      const fileName = file.files[0].name;
      this.literatureForm.get('fileName')?.setValue(fileName);
    }
  }
}
