import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { UserAccountsHomeComponent } from './user-accounts-home/user-accounts-home.component';
import { UserAccountDetailsComponent } from './user-account-details/user-account-details.component';
import { UserAccountsListComponent } from './user-accounts-list/user-accounts-list.component';
import { UserService } from './user.service';
import { UserAccountsResolverService } from './user-accounts-resolver.service';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    FormsModule
  ],
  declarations: [
    UserAccountsHomeComponent,
    UserAccountDetailsComponent,
    UserAccountsListComponent],
  providers: [
    UserService,
    UserAccountsResolverService
  ]
})
export class UserAccountsModule { }
