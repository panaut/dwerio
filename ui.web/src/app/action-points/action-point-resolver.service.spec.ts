import { TestBed, inject } from '@angular/core/testing';

import { ActionPointResolverService } from './action-point-resolver.service';

describe('ActionPointResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPointResolverService]
    });
  });

  it('should be created', inject([ActionPointResolverService], (service: ActionPointResolverService) => {
    expect(service).toBeTruthy();
  }));
});
