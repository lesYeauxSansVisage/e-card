import { TestBed } from '@angular/core/testing';

import { DeckService } from './deck.service';

describe('DeckService', () => {
  let service: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckService);
  });

  describe('getSlaveDeck', () => {
    it('getSlaveDeck should return a deck with 5 cards', () => {
      const slaveDeck = service.getSlaveDeck();

      expect(slaveDeck.length).toBe(5);
    });

    it('getSlaveDeck should return a deck with 4 citizen cards and a slave card', () => {
      const slaveDeck = service.getSlaveDeck();

      const citizenCards = slaveDeck.filter((card) => card.name === 'citizen');
      const slaveCard = slaveDeck.find((card) => card.name === 'slave');

      expect(citizenCards.length).toBe(4);
      expect(slaveCard).toBeTruthy();
    });
  });

  describe('getEmperorDeck', () => {
    it('getEmperorDeck should return a deck with 5 cards', () => {
      const emperorDeck = service.getEmperorDeck();

      expect(emperorDeck.length).toBe(5);
    });

    it('getEmperorDeck should return a deck with 4 citizen cards and a emperor card', () => {
      const emperorDeck = service.getEmperorDeck();

      const citizenCards = emperorDeck.filter(
        (card) => card.name === 'citizen'
      );
      const emperorCard = emperorDeck.find((card) => card.name === 'emperor');

      expect(citizenCards.length).toBe(4);
      expect(emperorCard).toBeTruthy();
    });
  });
});
