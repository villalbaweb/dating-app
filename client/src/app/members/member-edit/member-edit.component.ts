import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) 
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _accountService: AccountService,
    private _membersService: MembersService,
    private _toaster: ToastrService) { 

      this._accountService.currentUser$
      .pipe(take(1))
      .subscribe((user: User) => {
        this.user = user;
      });

  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this._membersService.getMember(this.user.userName)
    .subscribe((member: Member) => {
      this.member = member;
    });
  }

  updateMember() {
    console.log(this.member);
    this._toaster.success('Profile updated succesfully');
    this.editForm.reset(this.member);
  }
}
