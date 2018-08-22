import { Injectable } from '@angular/core';
import { PersonalAccount } from '../model';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly firebaseUrl = 'https://dwerio-2f645.firebaseio.com/';
  private _userAccounts: Array<PersonalAccount> = [];

  private _nextAccountId = 1;
  private _userAccounts$: BehaviorSubject<Array<PersonalAccount>>;

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
        });
      });

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

  public save(): void {
    // toDo: IC - check this, I think that id will cause problems...
    const body: string = JSON.stringify(this._userAccounts);
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const url = this.firebaseUrl + 'personalAccounts.json';

    this.http.post(url, body, { headers: headers });
  }
}
