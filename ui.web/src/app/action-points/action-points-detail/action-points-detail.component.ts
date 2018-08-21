import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '../../../../node_modules/@angular/router';
import { ActionPoint, GeoCoordinates, Address } from '../../model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActionPointsService } from '../action-points.service';

@Component({
  selector: 'app-action-points-detail',
  templateUrl: './action-points-detail.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ActionPointsDetailComponent implements OnInit {
  private actionPointForm: FormGroup;

  private _useAddress = false;
  private _useGeoLocation = false;
  private _showValidationErrors = false;
  private _submitted = false;

  private _actionPoint: ActionPoint;

  public get canDeactivate(): boolean {
    // return this.actionPointForm.pristine || this.actionPointForm.valid;
    return !this.actionPointForm.touched || this._submitted;
  }

  public set showValidationErrors(value: boolean) {
    this._showValidationErrors = value;
  }

  public get showValidationErrors(): boolean {
    return this._showValidationErrors;
  }

  public validationErrorClass(field: string): { [key: string]: boolean } {
    const path: string[] = field.split('.');

    let formCtrl: AbstractControl = this.actionPointForm;

    path.forEach((pathEl: string) => {
      formCtrl = (<FormGroup>formCtrl).controls[pathEl];
    });

    const isInvalid: boolean = (this.showValidationErrors || !formCtrl.pristine) && !formCtrl.valid;

    return { 'is-invalid': isInvalid };
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apSvc: ActionPointsService
  ) {

    this.validateAddressField = this.validateAddressField.bind(this);
    this.validateLocationField = this.validateLocationField.bind(this);

    this.actionPointForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      // 'useAddress': new FormControl(),
      'address': new FormGroup({
        'street': new FormControl('', this.validateAddressField),
        'number': new FormControl('', this.validateAddressField),
        'zip': new FormControl('', this.validateAddressField),
        'city': new FormControl('', this.validateAddressField),
      }),
      // 'useGeoLocation': new FormControl(),
      'geoLocation': new FormGroup({
        'longitude': new FormControl('', this.validateLocationField),
        'latitude': new FormControl('', this.validateLocationField)
      })
    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { actionPoint: ActionPoint }) => {
        if (data.actionPoint) {
          this._actionPoint = data.actionPoint;
        } else {
          this._actionPoint = new ActionPoint();
        }

        this.actionPointForm.controls['name'].setValue(this._actionPoint.name);

        if (this._actionPoint.address) {
          this._useAddress = true;

          (<FormGroup>this.actionPointForm.controls['address'])
            .controls['street']
            .setValue(this._actionPoint.address.street);
          (<FormGroup>this.actionPointForm.controls['address'])
            .controls['number']
            .setValue(this._actionPoint.address.number);
          (<FormGroup>this.actionPointForm.controls['address'])
            .controls['zip']
            .setValue(this._actionPoint.address.zip);
          (<FormGroup>this.actionPointForm.controls['address'])
            .controls['city']
            .setValue(this._actionPoint.address.city);
        }

        if (this._actionPoint.geoLocation) {
          this._useGeoLocation = true;
          (<FormGroup>this.actionPointForm.controls['geoLocation']).controls['longitude'].setValue(this._actionPoint.geoLocation.longitude);
          (<FormGroup>this.actionPointForm.controls['geoLocation']).controls['latitude'].setValue(this._actionPoint.geoLocation.latitude);
        }
      });
  }

  private toggleAddress(): void {
    this._useAddress = !this._useAddress;

    (<FormGroup>this.actionPointForm.controls['address'])
      .controls['street']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });
    (<FormGroup>this.actionPointForm.controls['address'])
      .controls['number']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });
    (<FormGroup>this.actionPointForm.controls['address'])
      .controls['zip']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });
    (<FormGroup>this.actionPointForm.controls['address'])
      .controls['city']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });
  }

  private toggleLocation(): void {
    this._useGeoLocation = !this._useGeoLocation;

    (<FormGroup>this.actionPointForm.controls['geoLocation'])
      .controls['longitude']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });
    (<FormGroup>this.actionPointForm.controls['geoLocation'])
      .controls['latitude']
      .updateValueAndValidity({ onlySelf: false, emitEvent: false });

    console.log(this.actionPointForm.valid);
  }

  private validateAddressField(control: AbstractControl) {
    if (this.actionPointForm && this._useAddress && !control.value) {
      return { required: true };
    }

    return null;
  }

  private validateLocationField(control: AbstractControl) {
    if (this.actionPointForm && this._useGeoLocation && !control.value) {
      return { required: true };
    }

    return null;
  }

  public onSubmit(): void {
    if (this.actionPointForm.valid) {
      this._actionPoint.name = this.actionPointForm.controls['name'].value;
      if (!this._useAddress) {
        this._actionPoint.address = null;
      } else {
        if (!this._actionPoint.address) {
          this._actionPoint.address = new Address();
        }

        this._actionPoint.address.street = (<FormGroup>this.actionPointForm.controls['address']).controls['street'].value;
        this._actionPoint.address.number = (<FormGroup>this.actionPointForm.controls['address']).controls['number'].value;
        this._actionPoint.address.zip = (<FormGroup>this.actionPointForm.controls['address']).controls['zip'].value;
        this._actionPoint.address.city = (<FormGroup>this.actionPointForm.controls['address']).controls['city'].value;
      }

      if (!this._useGeoLocation) {
        this._actionPoint.geoLocation = null;
      } else {
        if (!this._actionPoint.geoLocation) {
          this._actionPoint.geoLocation = new GeoCoordinates();
        }

        this._actionPoint.geoLocation.longitude = (<FormGroup>this.actionPointForm.controls['geoLocation']).controls['longitude'].value;
        this._actionPoint.geoLocation.latitude = (<FormGroup>this.actionPointForm.controls['geoLocation']).controls['latitude'].value;
      }

      this.apSvc.saveActionPoint(this._actionPoint);

      this._submitted = true;

      this.router.navigate(['/ap']);
    }
  }
}
