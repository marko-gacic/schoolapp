import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpAuthService } from "src/app/core/services/http-auth.service";
import { Router } from "@angular/router";
import { UserAuthDataService } from "src/app/core/services/user-auth-data.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]

})
export class RegisterComponent implements OnInit {

    registerForm: any

    constructor
        (private fb: FormBuilder,
            private httpAuth: HttpAuthService,
            private router: Router,
            private userAuthData: UserAuthDataService
        ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(register?: any) {

        this.registerForm = this.fb.group({
            username: [register?.username || '', Validators.required],
            email: [register?.email || '', Validators.required],
            password: [register?.password || '', Validators.required],
            confirmPassword: [register?.confirmPassword || '', Validators.required]
        });




        // this.registerForm = this.fb.group({
        //     userName: ['', Validators.required],
        //     email: ['', Validators.required],
        //     password: ['', Validators.required],
        //     confirmPassword: ['', Validators.required]
        // });

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

    onRegister() {
        const registerData = this.registerForm?.value;
        this.httpAuth.register(registerData).subscribe(
            (user: any) => {
                console.log('user', user);
                this.userAuthData.loggedUser = user;
                this.userAuthData.token = btoa(`${registerData.username}:${registerData.password}`)
                this.router.navigate(['/home']);
            }
        );
        console.log('registerData', registerData);
    }
}
