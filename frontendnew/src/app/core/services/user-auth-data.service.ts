import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UserAuthDataService {

    endpointPrefix = 'user';

    private _loggedUser?: User;
    httpClient: any;

    constructor(
        private http: HttpClient
    ) {
        const userStingData = this.storage.getItem('loggedUser');
        if (userStingData) {
            this._loggedUser = JSON.parse(userStingData);
        }
    }

    getLoggedUser(id: number) {
        return this.http.get<User>(`${this.endpointBasePath}/${id}`);
    }

    updateUser(user: User) {
        return this.http.put<User>(`${this.endpointBasePath}/${user.id}`, user);
    }

    get() {
        return this.http.get<User>(`${this.endpointBasePath}`);
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



    get endpointBasePath() {
        return `${environment.serverUrl}/${this.endpointPrefix}`;
    }





}


