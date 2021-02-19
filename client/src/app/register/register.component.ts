import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  registerForm: FormGroup;

  accountServiceSubscription: Subscription = new Subscription();

  constructor(
    private _accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe();
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountServiceSubscription = this._accountService.register(this.model)
    // .subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // },
    // error => {
    //   console.log(error);
    //   this.toastr.error(error.error);
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
