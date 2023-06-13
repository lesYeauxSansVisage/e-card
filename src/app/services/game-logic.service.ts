import { Injectable } from '@angular/core';
import ICard from '../interfaces/ICard';
import { DeckService } from './deck.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  turnSubject = new BehaviorSubject<number>(1);
  turn = 1;

  isTurnOver = new Subject<boolean>();

  playerPoints = 0;
  computerPoints = 0;

  currentPlayerDeck: string = 'emperor';
  currentComputerDeck: string = 'slave';

  constructor(private deckService: DeckService) {}

  checkWinner(playerCard: ICard, computerCard: ICard) {
    if (playerCard.beats === computerCard.name) {
      this.playerPoints += this.getPoints(this.currentPlayerDeck);
      this.increaseTurn();
      this.isTurnOver.next(true);
    }

    if (computerCard.beats === playerCard.name) {
      this.computerPoints += this.getPoints(this.currentComputerDeck);
      this.increaseTurn();
      this.isTurnOver.next(true);
    }
  }

  getPoints(deck: string): number {
    if (deck === 'emperor') {
      return 1;
    }

    if (deck === 'slave') {
      return 3;
    }

    return 0;
  }

  setPlayerDeck(deckName: string) {
    this.currentPlayerDeck = deckName;
  }

  setComputerDeck(deckName: string) {
    this.currentComputerDeck = deckName;
  }

  increaseTurn() {
    this.turn += 1;
    this.turnSubject.next(this.turn);
  }

  resetGame() {
    this.computerPoints = 0;
    this.playerPoints = 0;

    this.turn = 1;
  }
}
