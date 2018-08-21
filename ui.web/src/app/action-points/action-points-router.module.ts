import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionPointsHomeComponent } from './action-points-home/action-points-home.component';
import { ActionPointsDetailComponent } from './action-points-detail/action-points-detail.component';
import { ActionPointsListComponent } from './action-points-list/action-points-list.component';
import { ActionPointResolverService } from './action-point-resolver.service';
import { CanDeactivateGuard } from './can-deactivate-guard';

const actionPointsRoutes: Routes = [
  {
    path: '',
    component: ActionPointsHomeComponent,
    children: [
      { path: '', component: ActionPointsListComponent },
      {
        path: ':id',
        component: ActionPointsDetailComponent,
        resolve: {
          actionPoint: ActionPointResolverService
        },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(actionPointsRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ActionPointsRouterModule { }
