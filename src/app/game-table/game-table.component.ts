import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import ICard from '../interfaces/ICard';
import { DeckService } from '../services/deck.service';
import { GameLogicService } from '../services/game-logic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
})
export class GameTableComponent implements OnInit, OnDestroy {
  playerDeck: ICard[];
  computerDeck: ICard[];

  turnSub: Subscription;
  turn: number;

  turnOverSub: Subscription;
  isTurnOver = false;

  isGameOver = false;
  gameOverSub: Subscription;

  result = '';

  playerPoints = 0;
  computerPoints = 0;

  playerChoice: ICard | null;
  computerChoice: ICard | null;

  choosenPlayerCardId: number;
  computerCardId: number;

  lockSelectedCards = false;

  constructor(
    private deckService: DeckService,
    private gameLogicService: GameLogicService
  ) {}

  ngOnInit(): void {
    this.playerDeck = this.deckService.getEmperorDeck();
    this.computerDeck = this.deckService.getSlaveDeck();

    this.turnOverSub = this.gameLogicService.isTurnOver.subscribe((isOver) => {
      this.isTurnOver = isOver;
    });

    this.turnSub = this.gameLogicService.turnSubject.subscribe(
      (currentTurn) => {
        this.turn = currentTurn;
      }
    );

    this.gameOverSub = this.gameLogicService.isGameOver.subscribe((isOver) => {
      this.isGameOver = true;
      this.result = isOver;
    });
  }

  ngOnDestroy(): void {
    this.turnOverSub.unsubscribe();
    this.turnSub.unsubscribe();
  }

  onPlayerChoice(card: ICard) {
    if (!this.lockSelectedCards) {
      this.playerChoice = card;
      this.choosenPlayerCardId = card.id;
    }
  }

  getComputerChoice() {
    const randomValue = Math.floor(Math.random() * this.computerDeck.length);

    return this.computerDeck[randomValue];
  }

  playCard() {
    this.computerChoice = this.getComputerChoice();

    if (this.computerChoice && this.playerChoice && !this.lockSelectedCards) {
      this.computerCardId = this.computerChoice.id;

      this.lockSelectedCards = true;

      this.gameLogicService.checkWinner(this.playerChoice, this.computerChoice);

      setTimeout(() => {
        this.lockSelectedCards = false;

        if (this.isTurnOver) {
          this.playerPoints = this.gameLogicService.playerPoints;
          this.computerPoints = this.gameLogicService.computerPoints;

          this.removeCards();
          this.resetSelection();
          this.isTurnOver = false;

          this.gameLogicService.increaseTurn();
          this.getDecks();
        } else {
          this.removeCards();
          this.resetSelection();
        }
      }, 500);
    }
  }

  removeCards() {
    if (!this.playerChoice || !this.computerChoice) return;

    this.computerDeck = this.computerDeck.filter(
      (card) => card.id !== this.computerChoice?.id
    );

    this.playerDeck = this.playerDeck.filter(
      (card) => card.id !== this.playerChoice?.id
    );
  }

  resetGame() {
    this.resetSelection();
    this.isTurnOver = false;
    this.playerPoints = 0;
    this.computerPoints = 0;
    this.turn = 1;
    this.gameLogicService.resetGame();
    this.isGameOver = false;
    this.getDecks();
  }

  resetSelection() {
    this.choosenPlayerCardId = -1;
    this.computerCardId = -1;
    this.computerChoice = null;
    this.playerChoice = null;
  }

  getDecks() {
    if (this.turn < 4) {
      this.playerDeck = this.deckService.getEmperorDeck();
      this.computerDeck = this.deckService.getSlaveDeck();

      this.gameLogicService.setComputerDeck('slave');
      this.gameLogicService.setPlayerDeck('emperor');
    } else if (this.turn > 3 && this.turn < 7) {
      this.computerDeck = this.deckService.getEmperorDeck();
      this.playerDeck = this.deckService.getSlaveDeck();

      this.gameLogicService.setComputerDeck('emperor');
      this.gameLogicService.setPlayerDeck('slave');
    } else if (this.turn > 6 && this.turn < 10) {
      this.computerDeck = this.deckService.getSlaveDeck();
      this.playerDeck = this.deckService.getEmperorDeck();

      this.gameLogicService.setComputerDeck('slave');
      this.gameLogicService.setPlayerDeck('emperor');
    } else if (this.turn > 9 && this.turn < 13) {
      this.computerDeck = this.deckService.getEmperorDeck();
      this.playerDeck = this.deckService.getSlaveDeck();

      this.gameLogicService.setComputerDeck('emperor');
      this.gameLogicService.setPlayerDeck('slave');
    }
  }
}
