import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Professor, Literature } from 'src/app/core/models';
import { HttpLiteratureService } from 'src/app/core/services/http-literature.service';
import { HttpProfessorService } from 'src/app/core/services/http-professor.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-literature-form',
  templateUrl: './literature-form.component.html',
  styleUrls: ['./literature-form.component.css']
})
export class LiteratureFormComponent implements OnInit {
  literatureForm!: FormGroup;
  professors$!: Observable<Professor[]>;

  @ViewChild('fileName', { static: false }) fileName?: ElementRef;
  images: any;
  endpointPrefix: any;


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

  async onSave() {
    console.log(this.fileName);
    const { name, authors, issn, professor, fileName } = this.literatureForm.value;
    const literature = new FormData();
    literature.append('name', name);
    literature.append('authors', authors);
    literature.append('issn', issn);
    literature.append('professor', professor);
    literature.append('file', this.fileName?.nativeElement.files[0]);

    try {
      const result = await this.http.post<Literature>('http://localhost:3000', literature).subscribe((message: any) => {
        ;
        this.toastService.showToast({
          message: 'Literature saved successfully',
          header: 'Literature',
          classNames: 'bg-success',
        });
        this.router.navigate(['./literature/literature-list'], {
          queryParamsHandling: 'preserve'
        });
      });
    } catch (error) {
      console.log(error);
    }
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

  get endpointBasePath() {
    return `${environment.serverUrl}/${this.endpointPrefix}`;
  }

}
