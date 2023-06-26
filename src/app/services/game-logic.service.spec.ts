import { TestBed } from '@angular/core/testing';

import { GameLogicService } from './game-logic.service';
import ICard from '../interfaces/ICard';

fdescribe('GameLogicService', () => {
  let service: GameLogicService;

  const emperorCard: ICard = {
    id: 1,
    name: 'emperor',
    image: 'assets/imgs/Emperor.jpg',
    beats: 'citizen',
  };

  const slaveCard: ICard = {
    id: 2,
    name: 'slave',
    image: 'assets/imgs/Slave.jpg',
    beats: 'emperor',
  };

  const citizenCard: ICard = {
    id: 3,
    name: 'citizen',
    image: 'assets/imgs/Emperor.jpg',
    beats: 'Slave',
  };

  beforeEach(() => {
    service = TestBed.inject(GameLogicService);
  });

  describe('checkWinner', () => {
    it('should increase player points if playerCard beats computerCard', () => {
      const EXPECTED_RESULT = 3;

      service.setPlayerDeck('slave');
      service.setComputerDeck('emperor');

      service.checkWinner(slaveCard, emperorCard);

      expect(service.playerPoints).toEqual(EXPECTED_RESULT);
    });

    it('should increase computer points if playerCard beats computerCard', () => {
      const EXPECTED_RESULT = 3;

      service.setComputerDeck('slave');
      service.setPlayerDeck('emperor');

      service.checkWinner(emperorCard, slaveCard);

      expect(service.computerPoints).toEqual(EXPECTED_RESULT);
    });

    it('should not increase player or computer points if game has a draw', () => {
      service.checkWinner(citizenCard, citizenCard);

      expect(service.computerPoints).toBe(0);
      expect(service.playerPoints).toBe(0);
    });
  });

  describe('increaseTurn', () => {
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

  describe('getPoints', () => {
    it('should return 3 points if slave is passed as argument', () => {
      const getSlaveDeckPoints = service.getPoints('slave');

      expect(getSlaveDeckPoints).toBe(3);
    });

    it('should return 1 point if emperor is passed as argument', () => {
      const getEmperorDeckPoints = service.getPoints('emperor');

      expect(getEmperorDeckPoints).toBe(1);
    });
  });
});
