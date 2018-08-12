import { Injectable } from '@angular/core';
import { PersonalAccount } from '../model';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userAccounts: Array<PersonalAccount> = [];

  private _nextAccountId = 1;
  private _userAccounts$: BehaviorSubject<Array<PersonalAccount>>;

  constructor() {
    let pa = new PersonalAccount();
    pa.id = this._nextAccountId++;
    pa.username = 'panaut';
    pa.fullName = 'Milivoj Panautovic';
    pa.phoneNumber = '+381653211206';

    this._userAccounts.push(pa);

    pa = new PersonalAccount();
    pa.id = this._nextAccountId++;
    pa.username = 'gogi';
    pa.fullName = 'Goran Bakoc';
    pa.phoneNumber = '+38163270519';

    this._userAccounts.push(pa);

    pa = new PersonalAccount();
    pa.id = this._nextAccountId++;
    pa.username = 'sapke';
    pa.fullName = 'Ivan Bulut';
    pa.phoneNumber = '+381631027754';

    this._userAccounts.push(pa);

    pa = new PersonalAccount();
    pa.id = this._nextAccountId++;
    pa.username = 'shux';
    pa.fullName = 'Ivan Susic';
    pa.phoneNumber = '+381648552228';

    this._userAccounts.push(pa);

    this._userAccounts$ = new BehaviorSubject<PersonalAccount[]>(this._userAccounts);
  }

  public getUserAccounts(): Observable<PersonalAccount[]> {
    return this._userAccounts$;
  }

  public getUserAccount(id: number): PersonalAccount {
    // return this._actionPoints$.pipe();
    return this._userAccounts.find((pa: PersonalAccount) => pa.id === id);
  }

  public addUserAccount(acc: PersonalAccount): void {
    if (!acc.username) {
      throw new Error('Username is mandatory');
    }

    if (!acc.phoneNumber) {
      throw new Error('Phone Number is mandatory');
    }

    this._userAccounts.push(acc);
    this._userAccounts$.next(this._userAccounts);
  }

  public removeUserAccount(id: number): void {
    const accToDelete: PersonalAccount = this._userAccounts.find((acc: PersonalAccount) => acc.id === id);

    if (!accToDelete) {
      throw new Error(`There was no Personal Account with Id: ${id}`);
    }

    const indexToDelete = this._userAccounts.indexOf(accToDelete);
    this._userAccounts.splice(indexToDelete, 1);

    this._userAccounts$.next(this._userAccounts);
  }
}
