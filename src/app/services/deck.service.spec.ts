import { TestBed } from '@angular/core/testing';

import { DeckService } from './deck.service';

fdescribe('DeckService', () => {
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
});
