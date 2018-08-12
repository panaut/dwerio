import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from '../../../../node_modules/rxjs';
import { PersonalAccount } from '../../model';

@Component({
  selector: 'app-user-accounts-list',
  templateUrl: './user-accounts-list.component.html',
  styleUrls: ['./user-accounts-list.component.css']
})
export class UserAccountsListComponent implements OnInit {
  private _userAccounts$: Observable<PersonalAccount[]>;

  constructor(private uaSvc: UserService) { }

  ngOnInit() {
    this._userAccounts$ = this.uaSvc.getUserAccounts();
  }

}
