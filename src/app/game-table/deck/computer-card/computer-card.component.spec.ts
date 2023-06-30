import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCardComponent } from './computer-card.component';
import { DebugElement } from '@angular/core';
import { emperorDeck } from 'src/assets/tests-mock-data';
import { By } from '@angular/platform-browser';

describe('ComputerCardComponent', () => {
  let component: ComputerCardComponent;
  let fixture: ComponentFixture<ComputerCardComponent>;
  let el: DebugElement;

  const card = emperorDeck.find((card) => card.name === 'emperor')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputerCardComponent);
    component = fixture.componentInstance;
    component.card = card;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an image src and alt with a filename containining the card name', () => {
    const image = el.queryAll(By.css('.computer-card__image'))[1].nativeElement;

    expect(image.src.toLowerCase()).toContain(card.name);
    expect(image.alt).toContain(card.name);
  });

  it('should have the selected class if cardId is equal to the current selected card number', () => {
    component.selectedCard = card.id;
    fixture.detectChanges();

    const cardEl = el.query(By.css('.computer-card')).nativeElement;

    expect(cardEl).toHaveClass('selected');
  });
});
