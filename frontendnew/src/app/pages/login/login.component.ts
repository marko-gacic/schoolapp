import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpAuthService } from 'src/app/core/services/http-auth.service';
import { UserAuthDataService } from 'src/app/core/services/user-auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;

  constructor(private fb: FormBuilder,
    private httpAuth: HttpAuthService,
    private router: Router,
    private userAuthData: UserAuthDataService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['Admin', Validators.required],
      password: ['admin', Validators.required]
    });
  }

  showControlError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }

  controlHasAnyError(form: FormGroup, controlName: string, errorCode: string | string[]) {
    const control = form.get(controlName);
    if (typeof errorCode === 'string') {
      return control?.hasError(errorCode);
    } else {
      return errorCode.some(code => control?.hasError(code));
    }
  }

  onLogin() {
    const loginData = this.loginForm?.value;
    this.httpAuth.login(loginData).subscribe(
      (user: any) => {
        console.log('user', user);
        this.userAuthData.loggedUser = user;
        this.userAuthData.token = btoa(`${loginData.username}:${loginData.password}`)
        this.router.navigate(['/home']);
      }
    );
    console.log('loginData', loginData);
  }

}
