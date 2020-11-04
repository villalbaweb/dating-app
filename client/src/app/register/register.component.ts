import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  accountServiceSubscription: Subscription = new Subscription();

  constructor(
    private _accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe();
  }

  register() {
    this.accountServiceSubscription = this._accountService.register(this.model)
    .subscribe(response => {
      console.log(response);
      this.cancel();
    },
    error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
