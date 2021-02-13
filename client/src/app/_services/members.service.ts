import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private _http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    if(this.members.length > 0) return of(this.members);

    return this._http.get<Member[]>(this.baseUrl + 'users')
    .pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.userName === username);
    if(member !== undefined) return of(member);

    return this._http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this._http.put(this.baseUrl + 'users', member)
    .pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this._http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this._http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
