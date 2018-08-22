import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAccountsHomeComponent } from './user-accounts-home/user-accounts-home.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { UserAccountsListComponent } from './user-accounts-list/user-accounts-list.component';
import { UserAccountsResolverService } from './user-accounts-resolver.service';
import { CanDeactivateGuard } from './can-deactivate-guard';

const routes: Routes = [{
  path: '',
  component: UserAccountsHomeComponent,
  children: [
    { path: '', component: UserAccountsListComponent },
    {
      path: ':id',
      component: UserAccountDetailsComponent,
      resolve: { userAccount: UserAccountsResolverService },
      canDeactivate: [CanDeactivateGuard]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountsRoutingModule { }
