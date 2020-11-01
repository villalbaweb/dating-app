import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  model: any = {}

  accountServiceSubscription: Subscription = new Subscription();

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe();
  }

  login() {
    this.accountServiceSubscription = this.accountService.login(this.model)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();
  }

}
