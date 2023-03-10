import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserAuthDataService } from 'src/app/core/services/user-auth-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus = false;


  currentLanguage = 'en';

  constructor(
    private translateService: TranslateService,
    public userAuthData: UserAuthDataService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLanguageChange(language: string) {
    this.currentLanguage = language;
    this.translateService.use(language);
  }

  get userFullName() {
    if (this.userAuthData.loggedUser) {
      return `${this.userAuthData.loggedUser.role} `
    } else {
      return '';
    }
  }

  logoutUser() {
    this.userAuthData.logoutUser();
    this.router.navigate(['/login']);
  }

  registerUser() {
    this.router.navigate(['/register']);
  }

  onProfile() {
    this.router.navigate(['/user-profile']);
  }

  onToggleSideNav() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
