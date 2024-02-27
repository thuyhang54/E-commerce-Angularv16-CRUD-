import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) {  }
  login(body : any): any{
    return this.http.post<any>(`${api}/acounts/login`, body);
  }
}
