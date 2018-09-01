import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserAccountsHomeComponent } from './user-accounts-home/user-accounts-home.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { UserAccountsListComponent } from './user-accounts-list/user-accounts-list.component';
import { UserAccountsResolverService } from './user-accounts-resolver.service';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { CanDeactivateGuard } from './can-deactivate-guard';

@NgModule({
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserAccountsHomeComponent,
    UserAccountDetailsComponent,
    UserAccountsListComponent],
  providers: [
    UserAccountsResolverService,
    CanDeactivateGuard
  ]
})
export class UserAccountsModule { }
