import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe();
  }

  login() {
    this.accountServiceSubscription = this.accountService.login(this.model)
    .subscribe(response => {
      this.router.navigateByUrl('/members');
    },
    error => {
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
