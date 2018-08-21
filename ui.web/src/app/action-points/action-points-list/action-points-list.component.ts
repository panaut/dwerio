import { Component, OnInit } from '@angular/core';
import { ActionPointsService } from '../action-points.service';
import { Observable } from '../../../../node_modules/rxjs';
import { ActionPoint } from '../../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-points-list',
  templateUrl: './action-points-list.component.html',
  styleUrls: ['../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class ActionPointsListComponent implements OnInit {
  private actionPoints$: Observable<ActionPoint[]>;

  constructor(private apSvc: ActionPointsService, private router: Router) { }

  ngOnInit() {
    this.actionPoints$ = this.apSvc.getActionPoints();
  }

  public addNewActionPoint(): void {
    this.router.navigate(['/ap/new']);
  }

  public removeItem(actionPointId: number): void {
    this.apSvc.removeActionPoint(actionPointId);
  }
}
