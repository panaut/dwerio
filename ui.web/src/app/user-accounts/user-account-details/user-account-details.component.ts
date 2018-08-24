import { Component } from '@angular/core';
import { PersonalAccount } from '../../model';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class UserAccountDetailsComponent {
  private readonly intPhoneNumberFormatExp: string =
    `\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|` +
    `8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)` +
    `\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*\\d\\W*(\\d{1,2})$`;

  private _userAccount: PersonalAccount;
  private _userForm: FormGroup;

  private _showValidationErrors = false;
  private _submitted = false;

  public get canDeactivate(): boolean {
    // return this.actionPointForm.pristine || this.actionPointForm.valid;
    return this._userForm.pristine || this._submitted;
  }

  public set showValidationErrors(value: boolean) {
    this._showValidationErrors = value;
  }

  public get showValidationErrors(): boolean {
    return this._showValidationErrors;
  }

  public validationErrorClass(field: string): { [key: string]: boolean } {
    const path: string[] = field.split('.');

    let formCtrl: AbstractControl = this._userForm;

    path.forEach((pathEl: string) => {
      formCtrl = (<FormGroup>formCtrl).controls[pathEl];
    });

    const isInvalid: boolean = (this.showValidationErrors || !formCtrl.pristine) && !formCtrl.valid;

    return { 'is-invalid': isInvalid };
  }

  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.phoneRequiredValidator = this.phoneRequiredValidator.bind(this);

    this._userForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [ Validators.required, Validators.email ]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.pattern(this.intPhoneNumberFormatExp) ]),
      'fullName': new FormControl(),
    });

    this.route.data.subscribe((data: { userAccount: PersonalAccount }) => {
      if (data.userAccount) {
        this._userAccount = data.userAccount;

        this._userForm.controls['username'].setValue(this._userAccount.username);
        this._userForm.controls['email'].setValue(this._userAccount.email);
        this._userForm.controls['phoneNumber'].setValue(this._userAccount.phoneNumber);
        this._userForm.controls['fullName'].setValue(this._userAccount.fullName);
      } else {
        this._userAccount = new PersonalAccount();
      }
    });
  }

  private phoneRequiredValidator(control: AbstractControl) {
    if (this._userForm && (<FormGroup>this._userForm.controls['activationMethods']).controls['phoneCall'].value && !control.value) {
      return { required: true };
    }

    return null;
  }

  public onSubmit(): void {
    if (this._userForm.valid) {
      this._userAccount.username = this._userForm.controls['username'].value;
      this._userAccount.email = this._userForm.controls['email'].value;
      this._userAccount.phoneNumber = this._userForm.controls['phoneNumber'].value;
      this._userAccount.fullName = this._userForm.controls['fullName'].value;

      this.userSvc.saveUserAccount(this._userAccount);
      this._submitted = true;

      this.router.navigate(['/usr']);
    }
  }
}
