import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisionsRoutingModule } from './permissions-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    PermisionsRoutingModule
  ],
  declarations: [OverviewComponent]
})
export class PermissionsModule { }
