import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  maxDate: Date = new Date();

  accountServiceSubscription: Subscription = new Subscription();

  constructor(
    private _accountService: AccountService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this._formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required , this.matchValues('password')]]
    });
    this.registerForm.controls.password.valueChanges
    .subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null                    // if there is a match then return null
        : { isMatch : true }     // otherwise it does not match, it has to be true so the propery can beidentified in the remplate
    }
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
