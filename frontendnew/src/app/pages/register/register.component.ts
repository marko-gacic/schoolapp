import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]

})
export class RegisterComponent {
    userName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;

    constructor(private http: HttpClient) { }

    onSubmit() {

        if (this.password !== this.confirmPassword) {
            return alert("Passwords don't match");
        }



        this.http.post("http://localhost:3000/register", {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        }).subscribe((res: any) => {
            console.log(res);
        });
    }




}


