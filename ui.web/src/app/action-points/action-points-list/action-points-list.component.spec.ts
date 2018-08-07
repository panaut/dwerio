import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPointsListComponent } from './action-points-list.component';

describe('ActionPointsListComponent', () => {
  let component: ActionPointsListComponent;
  let fixture: ComponentFixture<ActionPointsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPointsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPointsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
