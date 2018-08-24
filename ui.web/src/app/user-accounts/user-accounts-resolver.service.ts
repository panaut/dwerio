import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { PersonalAccount } from '../model';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserAccountsResolverService implements Resolve<PersonalAccount> {
  constructor(private uaSvc: UserService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PersonalAccount> {
    const id: number = +route.paramMap.get('id');

    if (!isNaN(id)) {
      return this.uaSvc.getUserAccount(id);
    } else {
      // throw new Error('Route parameter ID not set');
    }
  }
}
