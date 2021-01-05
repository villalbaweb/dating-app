import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

let httpOptions = {};

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { 
    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token 
      })
    }
  }

  getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(this.baseUrl + 'users', httpOptions);
  }

  getMember(username: string): Observable<Member> {
    return this._http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
  }
}
