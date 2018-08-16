import { Injectable } from '@angular/core';
import { ActionPoint } from '../model';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActionPointsService {
  private readonly _actionPoints: ActionPoint[] = [];

  private _actionId = 1;
  private _actionPoints$: BehaviorSubject<ActionPoint[]>;

  constructor() {
    let ap = new ActionPoint();
    ap.id = this._actionId++;
    ap.name = 'Dominion';

    this._actionPoints.push(ap);

    ap = new ActionPoint();
    ap.id = this._actionId++;
    ap.name = 'Algotech';

    this._actionPoints.push(ap);

    ap = new ActionPoint();
    ap.id = this._actionId++;
    ap.name = 'Computer Outfit';

    this._actionPoints.push(ap);

    this._actionPoints$ = new BehaviorSubject<ActionPoint[]>(this._actionPoints);
  }

  public getActionPoints(): Observable<ActionPoint[]> {
    return this._actionPoints$;
  }

  public getActionPoint(id: number): ActionPoint {
    // return this._actionPoints$.pipe();
    return this._actionPoints.find((actPoint: ActionPoint) => actPoint.id === id);
  }

  public createNewActionPoint(name: string): void {
    const ap = new ActionPoint();
    ap.id = this._actionId++;
    ap.name = name;

    this._actionPoints.push(ap);
    this._actionPoints$.next(this._actionPoints);
  }

  public saveActionPoint(actionPoint: ActionPoint): void {
    if (actionPoint.id) {
      actionPoint.id = this._actionId++;
    }

    this._actionPoints.push(actionPoint);
    this._actionPoints$.next(this._actionPoints);
  }

  public removeActionPoint(id: number): void {
    const apTpDelete: ActionPoint = this._actionPoints.find((actPoint: ActionPoint) => actPoint.id === id);

    const indexToDelete = this._actionPoints.indexOf(apTpDelete);
    this._actionPoints.splice(indexToDelete, 1);

    this._actionPoints$.next(this._actionPoints);
  }
}
