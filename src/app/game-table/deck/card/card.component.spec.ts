import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CardComponent } from './card.component';
import { slaveDeck } from 'src/assets/tests-mock-data';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let el: DebugElement;

  const card = slaveDeck.find((card) => card.name === 'slave')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.cardData = card;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an image src and alt with a filename containining the card name', () => {
    const image = el.query(By.css('.card__image')).nativeElement;

    expect(image.src.toLowerCase()).toContain(card.name);
    expect(image.alt).toContain(card.name);
  });

  it('should have the selected class if cardId is equal to the current selected card number', () => {
    component.currentActiveCard = card.id;
    fixture.detectChanges();

    const cardEl = el.query(By.css('.card')).nativeElement;

    expect(cardEl).toHaveClass('selected');
  });
});
