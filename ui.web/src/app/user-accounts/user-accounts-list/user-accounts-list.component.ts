import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from '../../../../node_modules/rxjs';
import { PersonalAccount } from '../../model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-user-accounts-list',
  templateUrl: './user-accounts-list.component.html',
  styleUrls: ['../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class UserAccountsListComponent implements OnInit {
  private selectedId: number;
  private _userAccounts$: Observable<PersonalAccount[]>;

  constructor(
    private uaSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) {

    const selectedId$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => params.get('selectedId')));
    if (selectedId$) {
      selectedId$.subscribe((value: string) => this.selectedId = +value);
    }
  }

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
