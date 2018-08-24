import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from '../../../../node_modules/rxjs';
import { PersonalAccount } from '../../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-accounts-list',
  templateUrl: './user-accounts-list.component.html',
  styleUrls: ['../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class UserAccountsListComponent implements OnInit {
  private _userAccounts$: Observable<PersonalAccount[]>;

  constructor(
    private uaSvc: UserService,
    private router: Router) { }

  ngOnInit() {
    this._userAccounts$ = this.uaSvc.getUserAccounts();
  }

  public addNewUser(): void {
    this.router.navigate(['/usr/new']);
  }

  public removeItem(accountId: number) {
    this.uaSvc.removeUserAccount(accountId);
  }
}
