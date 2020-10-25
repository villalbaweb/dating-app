import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baserUrl = 'https//localhot:5001/api/';

  constructor(private _http: HttpClient) { }

  login(model: any) {
    return this._http.post(this.baserUrl + 'account/login', model);
  }
}
