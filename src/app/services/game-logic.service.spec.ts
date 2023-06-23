import { TestBed } from '@angular/core/testing';

import { GameLogicService } from './game-logic.service';

fdescribe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLogicService);
  });


  describe('checkWinner', () => {
    it('', () => {

    })

    it('', () => {
      
    })

    it('', () => {
      
    })

    it('', () => {
      
    })
  })

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

  it('should not call next in isGameOver when current turn less than 12 and increaseTurn method is called', () => {
    service.turn = 11;

    spyOn(service, 'endGame');

    service.increaseTurn();

    expect(service.endGame).not.toHaveBeenCalled();
  });

  it('should call the method endGame when current turn is 12 and increaseTurn method is called', () => {
    service.turn = 12;

    spyOn(service, 'endGame');

    service.increaseTurn();

    expect(service.endGame).toHaveBeenCalled();
  });
});
