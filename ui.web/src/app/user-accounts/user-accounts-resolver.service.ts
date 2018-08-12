import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { PersonalAccount } from '../model';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class UserAccountsResolverService implements Resolve<PersonalAccount> {
  constructor(private uaSvc: UserService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PersonalAccount {
    const id: number = +route.paramMap.get('id');

    if (!id) {
      throw new Error('Route parameter ID not set');
    }

    return this.uaSvc.getUserAccount(id);
  }
}
