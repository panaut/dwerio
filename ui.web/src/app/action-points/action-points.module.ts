import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPointsHomeComponent } from './action-points-home/action-points-home.component';
import { ActionPointsRouterModule } from './action-points-router.module';
import { ActionPointsDetailComponent } from './action-points-detail/action-points-detail.component';
import { ActionPointsListComponent } from './action-points-list/action-points-list.component';
import { ActionPointResolverService } from './action-point-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanDeactivateGuard } from './can-deactivate-guard';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    ActionPointsRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ActionPointsHomeComponent,
    ActionPointsDetailComponent,
    ActionPointsListComponent
  ],
  providers: [
    ActionPointResolverService,
    CanDeactivateGuard
  ]
})

export class ActionPointsModule { }
