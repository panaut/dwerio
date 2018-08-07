import { ActionPointsModule } from './action-points.module';

describe('ActionPointsModule', () => {
  let actionPointsModule: ActionPointsModule;

  beforeEach(() => {
    actionPointsModule = new ActionPointsModule();
  });

  it('should create an instance', () => {
    expect(actionPointsModule).toBeTruthy();
  });
});
