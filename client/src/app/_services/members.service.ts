import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string): Observable<Member> {
    return this._http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this._http.put(this.baseUrl + 'users', member);
  }
}
