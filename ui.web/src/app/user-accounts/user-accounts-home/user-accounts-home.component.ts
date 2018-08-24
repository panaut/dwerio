import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-accounts-home',
  templateUrl: './user-accounts-home.component.html',
  styleUrls: ['./user-accounts-home.component.css']
})
export class UserAccountsHomeComponent implements OnInit {

  constructor(private userSvc: UserService) { }

  ngOnInit() {
  }

  public save(): void {
    this.userSvc.save();
  }
}
