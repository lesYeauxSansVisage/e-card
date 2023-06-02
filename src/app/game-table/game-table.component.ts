import { Component, OnInit, Input } from '@angular/core';
import ICard from '../interfaces/ICard';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
})
export class GameTableComponent implements OnInit {
  playerDeck: ICard[];
  computerDeck: ICard[];
  turn: number = 1;

  playerChoice: ICard | null;
  computerChoice: ICard | null;

  choosenPlayerCardId: number | null;
  computerCardId: number | null;

  lockSelectedCards = false;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.playerDeck = this.deckService.getEmperorDeck();
    this.computerDeck = this.deckService.getSlaveDeck();
  }

  onPlayerChoice(card: ICard) {
    if (!this.lockSelectedCards) {
      this.playerChoice = card;
      this.choosenPlayerCardId = card.id;

      console.log(this.playerChoice);

      this.computerChoice = this.getComputerChoice();
    }
  }

  getComputerChoice() {
    const randomValue = Math.floor(Math.random() * this.computerDeck.length);

    return this.computerDeck[randomValue];
  }

  playCard() {
    if (!this.computerChoice || !this.playerChoice) {
      alert('Please select a card!');
      return;
    }

    if (this.playerChoice.beats === this.computerChoice.name) {
      this.computerCardId = this.computerChoice.id;

      setTimeout(() => {
        alert('Player Wins!');
        this.resetGame();
        this.increaseTurn();
        this.lockSelectedCards = false;
      }, 2000);
    } else if (this.computerChoice.beats === this.playerChoice.name) {
      this.lockSelectedCards = true;
      this.computerCardId = this.computerChoice.id;
      setTimeout(() => {
        alert('Computer Wins!');
        this.resetGame();
        this.increaseTurn();
        this.lockSelectedCards = false;
      }, 2000);
    } else {
      this.lockSelectedCards = true;
      this.computerCardId = this.computerChoice.id;

      setTimeout(() => {
        this.removeCards();
        this.resetSelection();
        this.lockSelectedCards = false;
      }, 2000);
    }
  }

  removeCards() {
    if (!this.playerChoice || !this.computerChoice) return;

    this.playerDeck = this.playerDeck.filter(
      (card) => card.id !== this.playerChoice?.id
    );
    console.log(this.playerDeck);

    this.computerDeck = this.computerDeck.filter(
      (card) => card.id !== this.computerChoice?.id
    );
  }

  resetGame() {
    this.computerDeck = this.deckService.getEmperorDeck();
    this.playerDeck = this.deckService.getSlaveDeck();
    this.playerChoice = null;
    this.computerChoice = null;
    this.choosenPlayerCardId = null;
    this.computerCardId = null;
  }

  resetSelection() {
    this.choosenPlayerCardId = null;
    this.computerCardId = null;
    this.computerChoice = null;
    this.playerChoice = null;
  }

  increaseTurn() {
    this.turn = this.turn += 1;
  }
}
