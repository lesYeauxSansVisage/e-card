import { Injectable } from '@angular/core';
import ICard from '../interfaces/ICard';
import { DeckService } from './deck.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  currentTurn = 1;

  isGameOver = new Subject<boolean>();

  playerPoints = 0;
  computerPoints = 0;

  currentPlayerDeck: string = 'emperor';
  currentComputerDeck: string = 'slave';

  constructor(private deckService: DeckService) {}

  checkWinner(playerCard: ICard, computerCard: ICard) {
    if (playerCard.beats === computerCard.name) {
      this.playerPoints += this.getPoints(this.currentPlayerDeck);
      this.isGameOver.next(true);
    }

    if (computerCard.beats === playerCard.name) {
      this.computerPoints += this.getPoints(this.currentComputerDeck);
      this.isGameOver.next(true);
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
}
