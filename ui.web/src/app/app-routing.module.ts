import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'ap', pathMatch: 'full' },
  { path: 'ap', loadChildren: './action-points/action-points.module#ActionPointsModule' },
  { path: 'usr', loadChildren: './user-accounts/user-accounts.module#UserAccountsModule' },
  { path: 'per', loadChildren: './permissions/permissions.module#PermissionsModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false   // <-- debugging purposes only

      }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
