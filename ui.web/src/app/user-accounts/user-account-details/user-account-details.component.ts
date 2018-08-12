import { Component, OnInit } from '@angular/core';
import { PersonalAccount } from '../../model';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class UserAccountDetailsComponent implements OnInit {
  private readonly intPhoneNumberFormatExp: string =
    `\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|` +
    `8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)` +
    `\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*(\\d{1,2})$`;

  private _userAccount: PersonalAccount;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { userAccount: PersonalAccount }) => {
      this._userAccount = data.userAccount;
    });
  }

  public goToList(): void {
    this.router.navigate(['/usr']);
  }
}
