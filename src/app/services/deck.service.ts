import { Injectable } from '@angular/core';
import ICard from '../interfaces/ICard';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private slaveDeck: ICard[] = [
    {
      id: 1,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    {
      id: 2,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    { id: 3, name: 'slave', image: 'assets/imgs/Slave.jpg', beats: 'emperor' },
    {
      id: 4,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    {
      id: 5,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
  ];

  private emperorDeck: ICard[] = [
    {
      id: 1,
      name: 'emperor',
      image: 'assets/imgs/Emperor.jpg',
      beats: 'citizen',
    },
    {
      id: 2,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    {
      id: 3,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    {
      id: 4,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
    {
      id: 5,
      name: 'citizen',
      image: 'assets/imgs/Citizen.jpg',
      beats: 'slave',
    },
  ];

  constructor() {}

  getSlaveDeck() {
    return this.shuffle(this.slaveDeck.slice());
  }

  getEmperorDeck() {
    return this.shuffle(this.emperorDeck.slice());
  }

  shuffle(deck: ICard[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  }
}
