import { Injectable } from '@angular/core';
import { PersonalAccount } from '../model';
import { BehaviorSubject, Observable, of } from '../../../node_modules/rxjs';
import { map, find } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly firebaseUrl = 'https://dwerio-2f645.firebaseio.com/';
  private _userAccounts: Array<PersonalAccount> = [];

  private _nextAccountId: number;
  private _userAccounts$: BehaviorSubject<Array<PersonalAccount>> = new BehaviorSubject<PersonalAccount[]>(this._userAccounts);

  constructor(private http: Http) {
    const url = this.firebaseUrl + 'personalAccounts.json';
    this.http.get(url)
      .pipe(map((response: Response) => response.json()))
      .subscribe((data: any) => {
        const keys = Object.keys(data);
        keys.forEach((key: string) => {
          const pa: PersonalAccount = <PersonalAccount>data[key];
          pa.id = +key;

          this._userAccounts.push(pa);

          if (pa.id >= this._nextAccountId) {
            this._nextAccountId = pa.id + 1;
          }
        });

        this._userAccounts$.next(this._userAccounts);
      });
  }

  public getUserAccounts(): Observable<PersonalAccount[]> {
    return this._userAccounts$;
  }

  public getUserAccount(id: number): Observable<PersonalAccount> {
    return this._userAccounts$.pipe(map((accounts: PersonalAccount[]) => accounts.find((pa: PersonalAccount) => pa.id === id)));
  }

  public saveUserAccount(userAccount: PersonalAccount): void {
    if (!userAccount.username) {
      throw new Error('Username is mandatory');
    }

    if (!userAccount.phoneNumber) {
      throw new Error('Phone Number is mandatory');
    }

    if (userAccount.id) {
      // This one is already updated - do nothing further...
    } else {
      // This one is suppose to be added
      userAccount.id = ++this._nextAccountId;

      this._userAccounts.push(userAccount);
      this._userAccounts$.next(this._userAccounts);
    }
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

  public save(): void {
    // toDo: IC - check this, I think that id will cause problems...
    const body: string = JSON.stringify(this._userAccounts);
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const url = this.firebaseUrl + 'personalAccounts.json';

    this.http.post(url, body, { headers: headers });
  }
}
