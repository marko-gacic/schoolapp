import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpAuthService } from '../services/http-auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    private readonly TOKEN_NAME = 'user_auth';
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    get token(): any {
        return localStorage.getItem(this.TOKEN_NAME)
    }

    constructor(private apiService: HttpAuthService) {
        this._isLoggedIn$.next(!!this.token)
    }

    login(userLogin: { username: string, password: string }) {
        return this.apiService.login(userLogin).pipe(
            tap((token: any) => {
                localStorage.setItem(this.TOKEN_NAME, token);
                this._isLoggedIn$.next(true);
            })
        )
    }

    logout() {
        localStorage.removeItem(this.TOKEN_NAME);
        this._isLoggedIn$.next(false);
    }

    resetPassword(email: string) {
        return this.apiService.resetPassword(email);
    }

    forgotPassword(email: string) {
        return this.apiService.forgotPassword(email);
    }



    changePassword(userChangePassword: { username: string, password: string, newPassword: string }) {
        return this.apiService.changePassword(userChangePassword);
    }


}
