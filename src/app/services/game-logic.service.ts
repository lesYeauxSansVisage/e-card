import { Injectable } from '@angular/core';
import ICard from '../interfaces/ICard';
import { BehaviorSubject, Subject } from 'rxjs';

export type deckType = 'slave' | 'emperor';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  turnSubject = new BehaviorSubject<number>(1);
  turn = 1;
  isTurnOver = new Subject<boolean>();

  isGameOver = new Subject<string>();

  playerPoints = 0;
  computerPoints = 0;

  currentPlayerDeck: deckType = 'emperor';
  currentComputerDeck: deckType = 'slave';

  NUMBER_OF_TURNS = 12;

  constructor() {}

  checkWinner(playerCard: ICard, computerCard: ICard) {
    if (playerCard.beats === computerCard.name) {
      this.playerPoints += this.getPoints(this.currentPlayerDeck);
      this.isTurnOver.next(true);
    }

    if (computerCard.beats === playerCard.name) {
      this.computerPoints += this.getPoints(this.currentComputerDeck);
      this.isTurnOver.next(true);
    }
  }

  getPoints(deck: deckType) {
    if (deck === 'emperor') {
      return 1;
    }

    if (deck === 'slave') {
      return 3;
    }

    return 0;
  }

  setPlayerDeck(deckName: deckType) {
    this.currentPlayerDeck = deckName;
  }

  setComputerDeck(deckName: deckType) {
    this.currentComputerDeck = deckName;
  }

  increaseTurn() {
    if (this.turn < this.NUMBER_OF_TURNS) {
      this.turn += 1;
      this.turnSubject.next(this.turn);
    } else {
      this.endGame();
    }
  }

  getResult() {
    if (this.playerPoints > this.computerPoints) {
      return 'win';
    }

    if (this.computerPoints > this.playerPoints) {
      return 'loss';
    }

    return 'draw';
  }

  endGame() {
    const result = this.getResult();
    this.isGameOver.next(result);
  }

  resetGame() {
    this.computerPoints = 0;
    this.playerPoints = 0;

    this.turn = 1;
  }
}
