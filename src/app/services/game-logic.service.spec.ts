import { TestBed } from '@angular/core/testing';

import { GameLogicService } from './game-logic.service';
import ICard from '../interfaces/ICard';
import { emperorDeck, slaveDeck } from 'src/assets/tests-mock-data';

describe('GameLogicService', () => {
  let service: GameLogicService;

  const emperorCard: ICard = emperorDeck.find(
    (card) => card.name === 'emperor'
  )!;

  const slaveCard: ICard = slaveDeck.find((card) => card.name === 'slave')!;

  const citizenCard: ICard = slaveDeck.find((card) => card.name === 'citizen')!;

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

  describe('setPlayerDeck', () => {
    it('should set the playerDeck property', () => {
      service.setPlayerDeck('slave');

      expect(service.currentPlayerDeck).toBe('slave');
    });
  });

  describe('setComputerDeck', () => {
    it('should set the computerDeck property', () => {
      service.setComputerDeck('slave');

      expect(service.currentComputerDeck).toBe('slave');
    });
  });

  describe('getResult', () => {
    it('should return "loss" if computer has more points than player', () => {
      service.computerPoints = 1;
      service.playerPoints = 0;

      const result = service.getResult();

      expect(result).toEqual('loss');
    });

    it('should return "win" if computer has less points than player', () => {
      service.computerPoints = 0;
      service.playerPoints = 1;

      const result = service.getResult();

      expect(result).toEqual('win');
    });

    it('should return "draw" if computer has the same amount of points as the player', () => {
      service.computerPoints = 1;
      service.playerPoints = 1;

      const result = service.getResult();

      expect(result).toEqual('draw');
    });
  });

  describe('endGame', () => {
    it('should call the subject isGameOver with the result when called', () => {
      let called = false;

      service.isGameOver.subscribe((result) => {
        called = true;

        expect(result).toBeTruthy();
        expect(result).toEqual('draw');
      });

      service.endGame();

      expect(called).toBeTrue();
    });
  });

  describe('resetGame', () => {
    it('should reset game state when called', () => {
      service.turn = 12;
      service.playerPoints = 1;
      service.computerPoints = 1;

      service.resetGame();

      expect(service.turn).toBe(1);
      expect(service.playerPoints).toBe(0);
      expect(service.computerPoints).toBe(0);
    });
  });
});
