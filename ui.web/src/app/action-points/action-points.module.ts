import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPointsHomeComponent } from './action-points-home/action-points-home.component';
import { ActionPointsRouterModule } from './action-points-router.module';
import { ActionPointsDetailComponent } from './action-points-detail/action-points-detail.component';
import { ActionPointsService } from './action-points.service';
import { ActionPointsListComponent } from './action-points-list/action-points-list.component';
import { ActionPointResolverService } from './action-point-resolver.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ActionPointsRouterModule,
    FormsModule
  ],
  declarations: [
    ActionPointsHomeComponent,
    ActionPointsDetailComponent,
    ActionPointsListComponent
  ],
  providers: [
    ActionPointsService,
    ActionPointResolverService
  ]
})
export class ActionPointsModule { }
