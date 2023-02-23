import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { UserAuthDataService } from 'src/app/core/services/user-auth-data.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm!: FormGroup;
  submitted = false;
  selectedFile!: File;

  @ViewChild('image', { static: false }) image?: ElementRef;
  images: any;
  endpointPrefix: any;
  toastService: any;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private user: UserAuthDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      email: [''],
      role: [''],
      status: [''],
      image: [''],
    });

    // this.user.getLoggedUser(1).subscribe((data) => {
    //   this.userForm.patchValue(data);



    // })


  }

  get f() { return this.userForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.userForm.invalid) {
  //     return;
  //   }

  //   this.user.updateUser(this.userForm.value).subscribe((data) => {
  //     console.log(data);
  //   }
  //   )

  // }

  async onSubmit() {
    const { userName, password, email, image } = this.userForm.value;
    const user = new FormData();
    user.append('userName', userName);
    user.append('password', password);
    user.append('email', email);
    user.append('image', this.image?.nativeElement.files[0]);

    try {
      const result = await this.http.post<User>('http://localhost:3000', user).subscribe((message: any) => {
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

  onFileSelected(event: any) {
    const image = event.target
    if (image.images.length > 0) {
      const images = image.images[0].name;
      this.userForm.get('image')?.setValue(images);
    }
  }







}
