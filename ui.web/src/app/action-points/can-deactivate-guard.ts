import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionPointsDetailComponent } from './action-points-detail/action-points-detail.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ActionPointsDetailComponent> {
    public canDeactivate(
        component: ActionPointsDetailComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> {

        if (!component.canDeactivate) {
            component.showValidationErrors = true;
        }

        return of(component.canDeactivate);
    }
}
