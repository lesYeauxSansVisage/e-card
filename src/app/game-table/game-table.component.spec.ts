import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

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
import { GameLogicService } from '../services/game-logic.service';
import { Subject } from 'rxjs';

fdescribe('GameTableComponent', () => {
  let component: GameTableComponent;
  let fixture: ComponentFixture<GameTableComponent>;
  let el: DebugElement;
  let service: any;

  const fakePoints = 5;

  const gameLogicServiceSpy = jasmine.createSpyObj(
    'GameLogicService',
    ['checkWinner', 'increaseTurn'],
    { computerPoints: fakePoints, playerPoints: fakePoints }
  );

  const isTurnOver = new Subject();
  const turnSubject = new Subject();
  const isGameOver = new Subject();

  gameLogicServiceSpy.isTurnOver = isTurnOver;
  gameLogicServiceSpy.turnSubject = turnSubject;
  gameLogicServiceSpy.isGameOver = isGameOver;

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
      providers: [{ provide: GameLogicService, useValue: gameLogicServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        gameLogicServiceSpy.checkWinner.calls.reset();
        fixture = TestBed.createComponent(GameTableComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        service = TestBed.inject(GameLogicService);
        fixture.detectChanges();
      });
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

  it('playCard should not call the method checkWinner if playerChoice or computerChoice is not valid', () => {
    component.playCard();

    expect(gameLogicServiceSpy.checkWinner).not.toHaveBeenCalled();
  });

  it('playCard should not call the method checkWinner if lockSelectedCards is set to true', () => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = true;

    component.playCard();

    expect(gameLogicServiceSpy.checkWinner).not.toHaveBeenCalled();
  });

  it('playCard should call the method checkWinner if lockSelectedCards is falsy and playerChoice/computerChoice are valids', () => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;

    component.playCard();

    expect(gameLogicServiceSpy.checkWinner).toHaveBeenCalled();
  });

  it('playCard should lock the selected cards if playerChoice/computerChoice are valids and card are not locked', () => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;

    component.playCard();

    expect(component.lockSelectedCards).toBeTrue();
  });

  it('playCard should lock the selected cards if playerChoice/computerChoice are valids and cards are not locked', () => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;

    component.playCard();

    expect(component.lockSelectedCards).toBeTrue();
  });

  it('playCard should unlock the selected cards again after 500ms if playerChoice/computerChoice are valids and cards are not locked', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;

    component.playCard();

    tick(500);

    expect(component.lockSelectedCards).toBeFalse();
  }));

  it('playCard should call removeCards and reset selection if turn is not over', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;

    let spy1 = spyOn(component, 'removeCards');
    let spy2 = spyOn(component, 'resetSelection');

    component.playCard();

    tick(500);

    expect(component.resetSelection).toHaveBeenCalledTimes(1);
    expect(component.removeCards).toHaveBeenCalledTimes(1);
  }));

  it('playCard should set isTurnOver to false after 500ms', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;
    component.isTurnOver = true;

    let spy1 = spyOn(component, 'removeCards');
    let spy2 = spyOn(component, 'resetSelection');

    component.playCard();

    tick(500);

    expect(component.isTurnOver).toBeFalse();
  }));

  it('playCard should change playerPoints and computerPoints if isTurnOver is truthy', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;
    component.isTurnOver = true;

    component.playCard();

    tick(500);

    expect(component.playerPoints).toBe(fakePoints);
    expect(component.computerPoints).toBe(fakePoints);
  }));

  it('playCard should not change playerPoints and computerPoints if isTurnOver is falsy', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;
    component.isTurnOver = false;

    component.playCard();

    tick(500);

    expect(component.playerPoints).toBe(0);
    expect(component.computerPoints).toBe(0);
  }));

  it('playCard call increaseTurn after 500ms is turnOver is true', fakeAsync(() => {
    component.playerChoice = slaveCard;
    component.computerChoice = emperorCard;
    component.lockSelectedCards = false;
    component.isTurnOver = true;

    component.playCard();

    tick(500);

    expect(gameLogicServiceSpy.increaseTurn).toHaveBeenCalledTimes(1);
  }));
});
