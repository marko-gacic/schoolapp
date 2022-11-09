import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthDataService } from 'src/app/core/services/user-auth-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentLanguage = 'en';

  constructor(
    public userAuthData: UserAuthDataService,
    private router: Router) { }

  ngOnInit(): void {
  }

 

  get userFullName() {
    if (this.userAuthData.loggedUser) {
      return `${this.userAuthData.loggedUser.firstName} ${this.userAuthData.loggedUser.lastName}`
    } else {
      return '';
    }
  }


  logoutUser() {
    this.userAuthData.logoutUser();
    this.router.navigate(['/login']);
  }

}
