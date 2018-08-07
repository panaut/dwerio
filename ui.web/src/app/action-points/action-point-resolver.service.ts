import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { ActionPoint } from '../model';
import { ActionPointsService } from './action-points.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class ActionPointResolverService implements Resolve<ActionPoint> {

  constructor(private apSvc: ActionPointsService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ActionPoint {
    const id: number = +route.paramMap.get('id');

    if (!id) {
      alert('no id');
    }
    return this.apSvc.getActionPoint(id);
  }
}
