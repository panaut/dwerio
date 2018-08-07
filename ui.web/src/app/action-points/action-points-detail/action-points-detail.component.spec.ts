import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPointsDetailComponent } from './action-points-detail.component';

describe('ActionPointsDetailComponent', () => {
  let component: ActionPointsDetailComponent;
  let fixture: ComponentFixture<ActionPointsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPointsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPointsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
