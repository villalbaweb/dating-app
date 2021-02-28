import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  registerForm: FormGroup;
  maxDate: Date = new Date();
  validationErrors: string[] = [];

  accountServiceSubscription: Subscription = new Subscription();

  constructor(
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    private _router: Router) { }

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
    this.accountServiceSubscription = this._accountService.register(this.registerForm.value)
    .subscribe(response => {
      this._router.navigateByUrl('/members');
    },
    error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
