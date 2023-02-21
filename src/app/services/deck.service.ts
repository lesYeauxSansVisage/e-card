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
    return this.slaveDeck.slice(0).sort();
  }

  getEmperorDeck() {
    return this.emperorDeck.slice(0);
  }
}
