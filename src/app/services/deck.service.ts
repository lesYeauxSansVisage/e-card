import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private slaveDeck: ICard[] = [
    { name: 'slave', image: 'assets/imgs/Slave.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
  ];

  private emperorDeck: ICard[] = [
    { name: 'emperor', image: 'assets/imgs/Emperor.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
    { name: 'citizen', image: 'assets/imgs/Citizen.jpg' },
  ];

  constructor() {}

  getSlaveDeck() {
    return this.shuffle(this.slaveDeck.slice(0));
  }

  getEmperorDeck() {
    return this.shuffle(this.emperorDeck.slice(0));
  }

  shuffle(deck: ICard[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }
}
