import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DeckComponent } from './deck.component';
import { slaveDeck } from 'src/assets/tests-mock-data';
import { CardComponent } from './card/card.component';
import { By } from '@angular/platform-browser';
import { ComputerCardComponent } from './computer-card/computer-card.component';

fdescribe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let el: DebugElement;

  const deck = slaveDeck;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckComponent, CardComponent, ComputerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    component.deck = slaveDeck;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 cards rendered when the property player is "player"', () => {
    component.player = 'player';
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.card'));

    expect(cards.length).toBe(5);
  });

  it('should have 5 cards rendered when the property player is "computer"', () => {
    component.player = 'computer';
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.computer-card'));

    expect(cards.length).toBe(5);
  });

  it('should set the choosenCardId equal to the id of the card clicked', () => {
    pending();
  });
});
