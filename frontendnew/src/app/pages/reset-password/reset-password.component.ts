import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/interceptors/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.authService.resetPassword(this.email).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }





}
