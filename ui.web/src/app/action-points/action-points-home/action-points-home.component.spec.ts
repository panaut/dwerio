import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPointsHomeComponent } from './action-points-home.component';

describe('ActionPointsHomeComponent', () => {
  let component: ActionPointsHomeComponent;
  let fixture: ComponentFixture<ActionPointsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPointsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPointsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
