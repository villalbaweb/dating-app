import { Component, OnInit } from '@angular/core';
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
  
  member: Member;
  user: User;

  constructor(
    private _accountService: AccountService,
    private _membersService: MembersService) { 

      this._accountService.currentUser$.pipe(take(1))
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

}
