import { Component, OnInit } from '@angular/core';
import { ActionPointsService } from '../../data-services';
import { Observable } from '../../../../node_modules/rxjs';
import { ActionPoint } from '../../model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-action-points-list',
  templateUrl: './action-points-list.component.html',
  styleUrls: ['../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class ActionPointsListComponent implements OnInit {
  actionPoints$: Observable<ActionPoint[]>;
  private selectedId: number;

  constructor(
    private apSvc: ActionPointsService,
    private router: Router,
    private route: ActivatedRoute) {
    const selectedId$: Observable<string> = this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const sId: string = params.get('selectedId');
      if (sId) { return sId; } else { return 'NaN'; }
    }));
    selectedId$.subscribe((value: string) => { if (!isNaN(+value)) { this.selectedId = +value; } });
  }

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
