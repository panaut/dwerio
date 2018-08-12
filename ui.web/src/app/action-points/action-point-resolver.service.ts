import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { ActionPoint } from '../model';
import { ActionPointsService } from './action-points.service';

@Injectable()
export class ActionPointResolverService implements Resolve<ActionPoint> {

  constructor(private apSvc: ActionPointsService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ActionPoint {
    const id: number = +route.paramMap.get('id');

    if (!id) {
      throw new Error('Route parameter ID not set');
    }

    return this.apSvc.getActionPoint(id);
  }
}
