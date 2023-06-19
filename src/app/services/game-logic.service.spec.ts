import { TestBed } from '@angular/core/testing';

import { GameLogicService } from './game-logic.service';

fdescribe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLogicService);
  });

  it('should not increase the turn if greater than 12', () => {
    service.turn = 12;
    service.increaseTurn();

    expect(service.turn).toEqual(12);
  });

  it('should call next in isGameOver with truthy value when current turn is 12 and increaseTurn method is called', (done) => {
    service.turn = 12;

    let called = false;

    service.isGameOver.subscribe((isOver) => {
      called = true;
      expect(isOver).toBeTruthy();
      expect(called).toBeTrue();
      done();
    });

    service.increaseTurn();
  });
});
