import { Injectable } from '@angular/core';
import { ActionPoint, Address, GeoCoordinates } from '../model';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ActionPointsService {
  private readonly firebaseUrl = 'https://dwerio-2f645.firebaseio.com/';
  private readonly _actionPoints: ActionPoint[] = [];

  private _nextActionPointId = 0;
  private _actionPoints$: BehaviorSubject<ActionPoint[]> = new BehaviorSubject<ActionPoint[]>(this._actionPoints);

  constructor(private http$: Http) {

  }

  public getActionPoints(): Observable<ActionPoint[]> {
    this.getData();
    return this._actionPoints$;
  }

  public getActionPoint(id: number): Promise<ActionPoint> {
    return this.getData().then(() => this._actionPoints.find((ap: ActionPoint) => ap.id === id));
  }

  public saveActionPoint(actionPoint: ActionPoint): void {
    if (isNaN(actionPoint.id)) {
      actionPoint.id = this._nextActionPointId++;
      this._actionPoints.push(actionPoint);
    }
  }

  public removeActionPoint(id: number): void {
    const apTpDelete: ActionPoint = this._actionPoints.find((actPoint: ActionPoint) => actPoint.id === id);

    const indexToDelete = this._actionPoints.indexOf(apTpDelete);
    this._actionPoints.splice(indexToDelete, 1);
  }

  public save(): void {
    const body: string = JSON.stringify(this._actionPoints);
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const url = this.firebaseUrl + 'actionPoints.json';

    this.http$.put(url, body, { headers: headers }).toPromise().catch((err: Error) => console.log(err));
  }

  private getData(): Promise<void> {
    if (this._actionPoints && this._actionPoints.length > 0) {
      // We already loaded collection from the firebase.
      return new Promise((res: Function, rej: Function) => res(this._actionPoints));
    }

    this._actionPoints.length = 0;
    // Load it from Fireabase
    const url = this.firebaseUrl + 'actionPoints.json';
    return this.http$.get(url)
      .pipe(map((data: Response) => data.json()))
      .toPromise()
      .then((data: any) => {
        if (!data || data.length === 0) {
          return;
        }

        data.forEach(element => {
          const ap: ActionPoint = <ActionPoint>element;
          if (ap) {
            this._actionPoints.push(ap);

            if (ap.id >= this._nextActionPointId) {
              this._nextActionPointId = ap.id + 1;
            }
          }
        });

        this._actionPoints$.next(this._actionPoints);
      });
  }
}
