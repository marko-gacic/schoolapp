import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserAuthDataService {

    private _loggedUser?: User;

    constructor() {
        const userStingData = this.storage.getItem('loggedUser');
        if (userStingData) {
            this._loggedUser = JSON.parse(userStingData);
        }
    }

    get loggedUser(): User | undefined {
        return this._loggedUser;
    }

    set loggedUser(user: User | undefined) {
        this._loggedUser = user;
        this.storage.setItem('loggedUser', JSON.stringify(this._loggedUser));
    }

    get token(): string | null {
        return this.storage.getItem('token');
    }

    set token(token: string | null) {
        if (token) {
            this.storage.setItem('token', token)
        }
    }

    get storage() {
        return localStorage;
    }

    logoutUser() {
        this.storage.clear();
        this._loggedUser = undefined;
    }
}


