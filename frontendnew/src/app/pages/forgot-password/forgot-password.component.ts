import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/interceptors/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) { }

  forgotPassword(email: string) {
    this.http.post('http://localhost:3000/forgot-password', { email }).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
  }



}
