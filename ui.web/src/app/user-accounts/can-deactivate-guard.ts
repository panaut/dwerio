import { Injectable } from '@angular/core';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserAccountDetailsComponent> {
    canDeactivate(
        component: UserAccountDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> {

        if (!component.canDeactivate) {
            component.showValidationErrors = true;
        }

        return of(component.canDeactivate);
    }
}
