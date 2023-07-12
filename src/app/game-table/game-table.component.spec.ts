import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTableComponent } from './game-table.component';
import { DeckComponent } from './deck/deck.component';
import { CardComponent } from './deck/card/card.component';
import { ComputerCardComponent } from './deck/computer-card/computer-card.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { emperorDeck, slaveDeck } from 'src/assets/tests-mock-data';
import ICard from '../interfaces/ICard';

fdescribe('GameTableComponent', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;
  let el: DebugElement;

  const slaveCard = slaveDeck.find((card) => card.name === 'slave')!;
  const emperorCard = emperorDeck.find((card) => card.name === 'emperor')!;
  const citizenCard = slaveDeck.find((card) => card.name === 'citizen')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameTableComponent,
        DeckComponent,
        CardComponent,
        ComputerCardComponent,
        ScoreboardComponent,
        EndScreenComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML', () => {
    it('if the property isGameOver is set to true, it should show the endscreen', () => {
      component.isGameOver = true;
      fixture.detectChanges();

      const endScreen = el.query(By.css('.end-screen'));

      expect(endScreen).toBeTruthy();
    });

    it('should have 2 decks in the screen, a player deck and a computer deck', () => {
      const decks = el.queryAll(By.css('.cards-container'));

      expect(decks.length).toBe(2);
    });

    it('should only activate the button to play a card if choice is not locked and if has a valid computer/player choice', () => {
      component.playerChoice = emperorCard;
      component.computerChoice = slaveCard;

      fixture.detectChanges();

      const playButton = el.query(By.css('.btn'));

      expect(playButton.nativeElement.disabled).toBeFalse();
    });
  });

  it('onPlayerChoice should not change playerChoice if lockSelectedCards is true', () => {
    component.lockSelectedCards = true;

    component.onPlayerChoice(emperorCard);

    expect(component.playerChoice).toBeUndefined();
  });

  it('onPlayerChoice should change playerChoice if lockSelectedCards is false', () => {
    component.lockSelectedCards = false;

    component.onPlayerChoice(emperorCard);

    expect(component.playerChoice).toBe(emperorCard);
  });

  it('playCard should call the getComputerChoice method', () => {
    spyOn(component, 'getComputerChoice');

    component.playCard();

    expect(component.getComputerChoice).toHaveBeenCalledTimes(1);
  });

  it('playCard should lock the selected cards if computerChoice and playerChoice are not null', () => {
    component.computerChoice = slaveCard;
    component.playerChoice = emperorCard;

    component.playCard();

    expect(component.lockSelectedCards).toBeTrue();
  });

  it('playCard should not lock the selected cards if computerChoice and playerChoice are not null', () => {
    component.playCard();

    expect(component.lockSelectedCards).toBeFalse();
  });
});
