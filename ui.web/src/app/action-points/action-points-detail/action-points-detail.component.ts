import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ActionPoint, GeoCoordinates, Address } from '../../model';

@Component({
  selector: 'app-action-points-detail',
  templateUrl: './action-points-detail.component.html',
  styleUrls: ['./action-points-detail.component.css']
})
export class ActionPointsDetailComponent implements OnInit {

  private _actionPoint: ActionPoint;
  private _showAddress: boolean;
  private _showGeoLocation: boolean;

  private get showAddress(): boolean {
    if (this._actionPoint.address) {
      return this._showAddress;
    } else {
      return false;
    }
  }

  private set showAddress(value: boolean) {
    if (value && !this._actionPoint.address) {
      this._actionPoint.address = new Address();
    }

    this._showAddress = value;
  }

  private get showGeoLocation(): boolean {
    if (this._actionPoint.geoLocation) {
      return this._showGeoLocation;
    } else {
      return false;
    }
  }

  private set showGeoLocation(value: boolean) {
    if (value && !this._actionPoint.geoLocation) {
      this._actionPoint.geoLocation = new GeoCoordinates();
    }

    this._showGeoLocation = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { actionPoint: ActionPoint }) => {
        this._actionPoint = data.actionPoint;

        if (this._actionPoint.address) {
          this.showAddress = true;
        }

        if (this._actionPoint.geoLocation) {
          this._showGeoLocation = true;
        }
      });
  }

  public goToList() {
    // this.router.navigate(['/ap', { ationPointId: this._actionPoint.id }]);
    this.router.navigate(['/ap']);
  }

}
