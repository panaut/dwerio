import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '../../../node_modules/@angular/router';
import { ActionPoint } from '../model';
import { ActionPointsService } from '../data-services';

@Injectable()
export class ActionPointResolverService implements Resolve<ActionPoint> {

  constructor(private apSvc: ActionPointsService) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ActionPoint> {
    const id: number = +route.paramMap.get('id');

    if (!isNaN(id)) {
      return this.apSvc.getActionPoint(id);
    } else {
      // throw new Error('Route parameter ID not set');
    }
  }
}
