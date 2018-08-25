import { Component, OnInit } from '@angular/core';
import { ActionPointsService } from '../action-points.service';

@Component({
  selector: 'app-action-points-home',
  templateUrl: './action-points-home.component.html',
  styleUrls: ['./action-points-home.component.css']
})
export class ActionPointsHomeComponent implements OnInit {

  constructor(private apSvc: ActionPointsService) { }

  ngOnInit() {
  }

  public save(): void {
    this.apSvc.save();
  }
}
