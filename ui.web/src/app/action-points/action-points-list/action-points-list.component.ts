import { Component, OnInit } from '@angular/core';
import { ActionPointsService } from '../action-points.service';
import { Observable } from '../../../../node_modules/rxjs';
import { ActionPoint } from '../../model';

@Component({
  selector: 'app-action-points-list',
  templateUrl: './action-points-list.component.html',
  styleUrls: ['./action-points-list.component.css']
})
export class ActionPointsListComponent implements OnInit {
  private actionPoints$: Observable<ActionPoint[]>;

  constructor(private apSvc: ActionPointsService) { }

  ngOnInit() {
    this.actionPoints$ = this.apSvc.getActionPoints();
  }

}
