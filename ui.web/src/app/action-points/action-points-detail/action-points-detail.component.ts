import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ActionPoint } from '../../model';

@Component({
  selector: 'app-action-points-detail',
  templateUrl: './action-points-detail.component.html',
  styleUrls: ['./action-points-detail.component.css']
})
export class ActionPointsDetailComponent implements OnInit {
  private _actionPoint: ActionPoint;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { actionPoint: ActionPoint }) => {
        this._actionPoint = data.actionPoint;

        alert(this._actionPoint.name);
      });
  }

}
