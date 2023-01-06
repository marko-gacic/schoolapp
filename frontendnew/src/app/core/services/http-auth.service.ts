import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {



  constructor(private httpClient: HttpClient) { }

  login(userLogin: { username: string, password: string }) {
    return this.httpClient.post('http://localhost:3000/user', userLogin);
  }

  register(userRegister: { email: string, password: string, confirmPassword: string }) {
    return this.httpClient.post('http://localhost:3000/register', userRegister);
  }




}
