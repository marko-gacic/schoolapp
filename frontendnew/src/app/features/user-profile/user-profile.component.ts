import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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




  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private user: UserAuthDataService
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.user.updateUser(this.userForm.value).subscribe((data) => {
      console.log(data);
    }
    )

  }



}
