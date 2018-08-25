import { Injectable } from '@angular/core';
import { PersonalAccount } from '../model';
import { BehaviorSubject, Observable, of } from '../../../node_modules/rxjs';
import { map, find } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly firebaseUrl = 'https://dwerio-2f645.firebaseio.com/';
  private _userAccounts: Array<PersonalAccount> = [];

  private _nextAccountId = 0;
  private _userAccounts$: BehaviorSubject<Array<PersonalAccount>> = new BehaviorSubject<PersonalAccount[]>(this._userAccounts);

  constructor(private http: Http) {
  }

  public getUserAccounts(): Observable<PersonalAccount[]> {
    this.getData();
    return this._userAccounts$;
  }

  public getUserAccount(id: number): Promise<PersonalAccount> {
    return this.getData().then(() => this._userAccounts.find((pa: PersonalAccount) => pa.id === id));
  }

  public saveUserAccount(userAccount: PersonalAccount): void {
    if (!userAccount.username) {
      throw new Error('Username is mandatory');
    }

    if (!userAccount.phoneNumber) {
      throw new Error('Phone Number is mandatory');
    }

    if (!isNaN(userAccount.id)) {
      // This one is already updated - do nothing further...
    } else {
      // This one is suppose to be added
      userAccount.id = this._nextAccountId++;

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
    const body: string = JSON.stringify(this._userAccounts);
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const url = this.firebaseUrl + 'personalAccounts.json';

    this.http.put(url, body, { headers: headers }).toPromise().catch((err: Error) => console.log(err));
  }

  private getData(): Promise<void> {
    if (this._userAccounts && this._userAccounts.length > 0) {
      // We already loaded collection from the firebase.
      return new Promise((res: Function, rej: Function) => res(this._userAccounts));
    }

    // Load it from Fireabase
    const url = this.firebaseUrl + 'personalAccounts.json';
    this._userAccounts.length = 0;
    return this.http.get(url)
      .pipe(map((data: Response) => data.json()))
      .toPromise()
      .then((data: any) => {
        if (!data || data.length === 0) {
          return;
        }

        data.forEach(element => {
          const pa: PersonalAccount = <PersonalAccount>element;
          if (pa) {
            this._userAccounts.push(pa);

            if (pa.id >= this._nextAccountId) {
              this._nextAccountId = pa.id + 1;
            }
          }
        });

        this._userAccounts$.next(this._userAccounts);
      });
  }
}
