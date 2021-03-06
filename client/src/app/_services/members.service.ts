import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();  // this works just like a Dictionary type in C#
  user: User;
  userParams: UserParams;

  constructor(
    private _http: HttpClient,
    private _accountService: AccountService) {
      this._accountService.currentUser$
      .pipe(take(1))
      .subscribe(user => {
        
        this.user = user;
        
        this.userParams = new UserParams(this.user);
      });
    }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {

    var memberCacheKey = Object.values(userParams).join('-');
    var response = this.memberCache.get(memberCacheKey);
    if(response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(userParams);

    return this.getPaginatedResults<Member[]>(this.baseUrl + 'users', params)
      .pipe(
        map(response => {
          this.memberCache.set(memberCacheKey, response);
          return response;
        }
      )
    );
  }

  getMember(username: string): Observable<Member> {
    const cacheFoundMember = [...this.memberCache.values()]
      .reduce((arr, element) => arr.concat(element.result), [])
      .find((member: Member) => member.userName === username);

    if(cacheFoundMember) {
      return of(cacheFoundMember);
    }

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
  
  private getPaginatedResults<T>(url, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this._http.get<T>(url, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
          }

          return paginatedResult;
        })
      );
  }

  private getPaginationHeaders(userParams: UserParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', userParams.pageNumber.toString());
    params = params.append('pageSize', userParams.pageSize.toString());
    
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return params;
  }
}
