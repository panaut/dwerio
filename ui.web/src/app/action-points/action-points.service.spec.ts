import { TestBed, inject } from '@angular/core/testing';
import { ActionPointsService } from '../data-services';

describe('ActionPointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPointsService]
    });
  });

  it('should be created', inject([ActionPointsService], (service: ActionPointsService) => {
    expect(service).toBeTruthy();
  }));
});
