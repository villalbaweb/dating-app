import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  loggedIn: boolean;

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this._accountService.login(this.model)
    .subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    },
    error => {
      console.log(error);
    });
  }
}
