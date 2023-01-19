import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-literatures',
  templateUrl: './literatures.component.html',
  styleUrls: ['./literatures.component.css']
})
export class LiteraturesComponent implements OnInit {

  selectedFile!: File;
  uploadProgress!: number;
  literatureForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.literatureForm = this.formBuilder.group({
      name: ['', Validators.required],
      authors: ['', Validators.required],
      issn: ['', Validators.required],
      professor_id: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('name', this.literatureForm?.get('name')?.value);
    uploadData.append('authors', this.literatureForm?.get('authors')?.value);
    uploadData.append('issn', this.literatureForm?.get('issn')?.value);
    uploadData.append('professor_id', this.literatureForm?.get('professor_id')?.value);
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:8080/literatures', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === 4) {
        this.router.navigate(['/literatures']);
      }
    });
  }




}
